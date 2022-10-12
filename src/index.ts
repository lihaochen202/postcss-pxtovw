import { mergeDefaultPluginOptions } from './options'
import { createReplacer } from './value'
import { extractPixels, isPassRules } from './rules'
import type { PluginCreator, Root, Declaration, Rule } from 'postcss'
import type { PluginOptions } from './options'

const pluginProcess = Symbol('PROCESS')
interface PluginProcess {
  [pluginProcess]?: boolean
}

type RootWithPluginProcess = Root & PluginProcess
type RuleWithPluginProcess = Rule & PluginProcess
type DeclarationWithPluginProcess = Declaration & PluginProcess

export const ignoreComment = 'pxtovw-ignore'

const pluginCreator: PluginCreator<Partial<PluginOptions>> = (options = {}) => {
  const opts = mergeDefaultPluginOptions(options)
  const replacer = createReplacer(opts)

  return {
    postcssPlugin: 'postcss-pxtovw',
    Once(root: RootWithPluginProcess) {
      const file = root.source?.input.file || ''

      if (isPassRules(opts.include, file)) root[pluginProcess] = true
      if (isPassRules(opts.exclude, file)) root[pluginProcess] = false
    },
    Comment(comment) {
      if (comment.text !== ignoreComment) return

      const next = comment.next()
      if (next?.type === 'rule') {
        ;(next as RuleWithPluginProcess)[pluginProcess] = true
        return
      }
      if (next?.type === 'decl') {
        ;(next as DeclarationWithPluginProcess)[pluginProcess] = true
      }
    },
    Rule(rule: RuleWithPluginProcess) {
      const signPluginProcess = (decl: DeclarationWithPluginProcess) => {
        decl[pluginProcess] = true
      }

      const root: RootWithPluginProcess = rule.root()
      if (!root[pluginProcess]) {
        rule.walkDecls(signPluginProcess)
        return
      }

      if (rule[pluginProcess]) {
        rule.walkDecls(signPluginProcess)
        return
      }

      if (!isPassRules(opts.includeSelectors, rule.selector)) {
        rule.walkDecls(signPluginProcess)
        return
      }

      if (isPassRules(opts.excludeSelectors, rule.selector)) {
        rule.walkDecls(signPluginProcess)
      }
    },
    Declaration(decl: DeclarationWithPluginProcess) {
      if (decl[pluginProcess]) return

      if (!decl.value.includes('px')) return

      if (!isPassRules(opts.includeProps, decl.prop)) return
      if (isPassRules(opts.excludeProps, decl.prop)) return

      const value = decl.value.replace(extractPixels, replacer)

      decl.value = value
      decl[pluginProcess] = true
    }
  }
}

pluginCreator.postcss = true

export default pluginCreator
