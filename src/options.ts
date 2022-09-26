export interface PluginOptions {
  viewportWidth: number
  unitPrecision: number
  minPixelValue: number
  include: RegExp[]
  exclude: RegExp[]
}

export const defaultPluginOptions: PluginOptions = {
  viewportWidth: 375,
  unitPrecision: 5,
  minPixelValue: 1,
  include: [/.*/],
  exclude: []
}

export function mergeDefaultPluginOptions(options: Partial<PluginOptions>): PluginOptions {
  return Object.assign({}, defaultPluginOptions, options)
}
