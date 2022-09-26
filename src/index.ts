import { mergeDefaultPluginOptions } from './options'
import { createReplacer } from './value'
import { extractPixels, isPassRegExps } from './regex'
import type { PluginCreator, Root, Declaration } from 'postcss'
import type { PluginOptions } from './options'

const pluginProcess = Symbol('PROCESS')
interface PluginProcess {
  [pluginProcess]?: boolean
}

type RootWithPluginProcess = Root & PluginProcess
type DeclarationWithPluginProcess = Declaration & PluginProcess

const pluginCreator: PluginCreator<Partial<PluginOptions>> = (options = {}) => {
  const opts = mergeDefaultPluginOptions(options)
  const replacer = createReplacer(opts)

  return {
    postcssPlugin: 'postcss-pxtovw',
    Once(root: RootWithPluginProcess) {
      const file = root.source?.input.file || ''

      if (isPassRegExps(opts.include, file)) root[pluginProcess] = true
      if (isPassRegExps(opts.exclude, file)) root[pluginProcess] = false
    },
    Declaration(decl: DeclarationWithPluginProcess) {
      const root: RootWithPluginProcess = decl.root()
      if (!root[pluginProcess]) return

      if (decl[pluginProcess]) return

      if (!decl.value.includes('px')) return

      const value = decl.value.replace(extractPixels, replacer)

      decl.value = value
      decl[pluginProcess] = true
    }
  }
}

pluginCreator.postcss = true

export default pluginCreator
