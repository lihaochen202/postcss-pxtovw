export const extractPixels = /"[^"]+"|'[^']+'|url\([^)]+\)|var\([^)]+\)|(\d*\.?\d+)px/g

export const toObjectString = (value: unknown) => Object.prototype.toString.call(value)
export const isString = (value: unknown): value is string => toObjectString(value) === '[object String]'
export const isRegExp = (value: unknown): value is RegExp => toObjectString(value) === '[object RegExp]'
export const isFunction = (value: unknown): value is Function => toObjectString(value) === '[object Function]'

export type Rule = string | RegExp | Function

export function isPassRules(rules: Rule[], value: string) {
  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i]
    if (isString(rule) && value.includes(rule)) return true
    if (isRegExp(rule) && rule.test(value)) return true
    if (isFunction(rule) && rule(value)) return true
  }
  return false
}
