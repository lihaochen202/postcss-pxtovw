import type { Rule } from './rules'

export interface PluginOptions {
  viewportWidth: number
  unitPrecision: number
  minPixelValue: number
  include: Rule[]
  exclude: Rule[]
  includeProps: Rule[]
  excludeProps: Rule[]
  includeSelectors: Rule[]
  excludeSelectors: Rule[]
  mediaQuery: boolean
}

export const defaultPluginOptions: PluginOptions = {
  viewportWidth: 375,
  unitPrecision: 5,
  minPixelValue: 1,
  include: [/.*/],
  exclude: [],
  includeProps: [/.*/],
  excludeProps: [],
  includeSelectors: [/.*/],
  excludeSelectors: [],
  mediaQuery: false
}

export function mergeDefaultPluginOptions(options: Partial<PluginOptions>): PluginOptions {
  return Object.assign({}, defaultPluginOptions, options)
}
