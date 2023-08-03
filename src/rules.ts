import { isString, isRegExp, isFunction } from "@lihaochen/kite";

export const extractPixels = /"[^"]+"|'[^']+'|url\([^)]+\)|var\([^)]+\)|(\d*\.?\d+)px/g

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
