import type { PluginOptions } from './options'

export function createReplacer(options: PluginOptions) {
  return function (rawStr: string, $1: string) {
    if (!$1) return rawStr
    const pixels = parseInt($1)
    if (pixels <= options.minPixelValue) return rawStr
    const computedValue = toFixed((pixels / options.viewportWidth) * 100, options.unitPrecision)
    return computedValue === 0 ? '0' : `${computedValue}vw`
  }
}

export function toFixed(number: number, precision: number) {
  const multiplier = Math.pow(10, precision + 1)
  const wholeNumber = Math.floor(number * multiplier)
  return (Math.round(wholeNumber / 10) * 10) / multiplier
}
