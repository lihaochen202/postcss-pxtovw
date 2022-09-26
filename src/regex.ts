export const isRegExp = (value: unknown): value is RegExp => Object.prototype.toString.call(value) === '[object RegExp]'

export function isPassRegExps(rules: RegExp[], value: string) {
  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i]
    if (isRegExp(rule) && rule.test(value)) {
      return true
    }
  }
  return false
}

export const extractPixels = /"[^"]+"|'[^']+'|url\([^)]+\)|var\([^)]+\)|(\d*\.?\d+)px/g
