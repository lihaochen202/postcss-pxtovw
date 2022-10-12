import { test, expect } from 'vitest'
import { isString, isRegExp, isFunction } from './rules'

const _string = ''
const _number = 0
const _boolean = false
const _array: string[] = []
const _object = {}
const _regexp = /.*/
const _function = () => false

test('should match string value', () => {
  expect(isString(_string)).toEqual(true)
  expect(isString(_number)).toEqual(false)
  expect(isString(_boolean)).toEqual(false)
  expect(isString(_array)).toEqual(false)
  expect(isString(_object)).toEqual(false)
  expect(isString(_regexp)).toEqual(false)
  expect(isString(_function)).toEqual(false)
})

test('should match regexp value', () => {
  expect(isRegExp(_string)).toEqual(false)
  expect(isRegExp(_number)).toEqual(false)
  expect(isRegExp(_boolean)).toEqual(false)
  expect(isRegExp(_array)).toEqual(false)
  expect(isRegExp(_object)).toEqual(false)
  expect(isRegExp(_regexp)).toEqual(true)
  expect(isRegExp(_function)).toEqual(false)
})

test('should match function value', () => {
  expect(isFunction(_string)).toEqual(false)
  expect(isFunction(_number)).toEqual(false)
  expect(isFunction(_boolean)).toEqual(false)
  expect(isFunction(_array)).toEqual(false)
  expect(isFunction(_object)).toEqual(false)
  expect(isFunction(_regexp)).toEqual(false)
  expect(isFunction(_function)).toEqual(true)
})
