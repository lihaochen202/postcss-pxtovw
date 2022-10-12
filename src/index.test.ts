import { test, expect } from 'vitest'
import postcss from 'postcss'
import plugin, { ignoreComment } from '.'

test('should work on the readme example', async () => {
  const input = `h1 { margin: 0 0 20px; font-size: 32px; line-height: 1.2; letter-spacing: 1px; }`
  const output = `h1 { margin: 0 0 5.33333vw; font-size: 8.53333vw; line-height: 1.2; letter-spacing: 1px; }`

  const result = await postcss(plugin()).process(input, { from: 'example.css' })

  expect(result.css).toEqual(output)
})

test('should replace the px unit with vw', async () => {
  const input = `.rule { font-size: 15px }`
  const output = `.rule { font-size: 4vw }`

  const result = await postcss(plugin()).process(input, { from: 'example.css' })

  expect(result.css).toEqual(output)
})

test('should ignore non px properties', async () => {
  const input = `.rule { margin: 0 10vw 20px }`
  const output = `.rule { margin: 0 10vw 5.33333vw }`

  const result = await postcss(plugin()).process(input, { from: 'example.css' })

  expect(result.css).toEqual(output)
})

test('should ignore custom min value', async () => {
  const input = `.rule { margin: 0 10px 20px }`
  const output = `.rule { margin: 0 10px 5.33333vw }`

  const result = await postcss(plugin({ minPixelValue: 10 })).process(input, { from: 'example.css' })

  expect(result.css).toEqual(output)
})

test('should handle inculde file', async () => {
  const input = `.rule { font-size: 15px }`
  const output = `.rule { font-size: 4vw }`

  const result = await postcss(plugin({ include: [/example.css/] })).process(input, { from: 'example.css' })

  expect(result.css).toEqual(output)
})

test('should ignore exculde file', async () => {
  const input = `.rule { font-size: 15px }`
  const output = `.rule { font-size: 15px }`

  const result = await postcss(plugin({ exclude: [/example/] })).process(input, { from: 'example.css' })

  expect(result.css).toEqual(output)
})

test('should handle inculde prop', async () => {
  const input = `.rule { margin: 0 0 20px; padding: 0 0 20px; letter-spacing: 20px; font-size: 15px }`
  const output = `.rule { margin: 0 0 5.33333vw; padding: 0 0 5.33333vw; letter-spacing: 5.33333vw; font-size: 15px }`

  const result = await postcss(plugin({ includeProps: ['margin', /padding/, (prop: string) => prop.includes('spacing')] })).process(input, { from: 'example.css' })

  expect(result.css).toEqual(output)
})

test('should ignore exculde prop', async () => {
  const input = `.rule { margin: 0 0 20px; padding: 0 0 20px; letter-spacing: 20px; font-size: 15px }`
  const output = `.rule { margin: 0 0 20px; padding: 0 0 20px; letter-spacing: 20px; font-size: 4vw }`

  const result = await postcss(plugin({ excludeProps: ['margin', /padding/, (prop: string) => prop.includes('spacing')] })).process(input, { from: 'example.css' })

  expect(result.css).toEqual(output)
})

test('should handle inculde selector', async () => {
  const input = `.string { font-size: 15px } .regexp { font-size: 15px } .function { font-size: 15px } .normal { font-size: 15px }`
  const output = `.string { font-size: 4vw } .regexp { font-size: 4vw } .function { font-size: 4vw } .normal { font-size: 15px }`

  const result = await postcss(plugin({ includeSelectors: ['string', /regexp/, (prop: string) => prop.includes('func')] })).process(input, { from: 'example.css' })

  expect(result.css).toEqual(output)
})

test('should ignore exculde selector', async () => {
  const input = `.string { font-size: 15px } .regexp { font-size: 15px } .function { font-size: 15px } .normal { font-size: 15px }`
  const output = `.string { font-size: 15px } .regexp { font-size: 15px } .function { font-size: 15px } .normal { font-size: 4vw }`

  const result = await postcss(plugin({ excludeSelectors: ['string', /regexp/, (prop: string) => prop.includes('func')] })).process(input, { from: 'example.css' })

  expect(result.css).toEqual(output)
})

test('should ignore comment selector', async () => {
  const input = `/* ${ignoreComment} */ .rule { font-size: 15px; letter-spacing: 20px } .rule { font-size: 15px; /* ${ignoreComment} */ letter-spacing: 20px }`
  const output = `/* ${ignoreComment} */ .rule { font-size: 15px; letter-spacing: 20px } .rule { font-size: 4vw; /* ${ignoreComment} */ letter-spacing: 20px }`

  const result = await postcss(plugin()).process(input, { from: 'example.css' })

  expect(result.css).toEqual(output)
})

test('should ignore comment properies', async () => {
  const input = `.rule { font-size: 15px; /* ${ignoreComment} */ letter-spacing: 20px }`
  const output = `.rule { font-size: 4vw; /* ${ignoreComment} */ letter-spacing: 20px }`

  const result = await postcss(plugin()).process(input, { from: 'example.css' })

  expect(result.css).toEqual(output)
})

test('should handle media queries', async () => {
  const input = `@media (width: 20px) { .rule { font-size: 15px } }`
  const output = `@media (width: 5.33333vw) { .rule { font-size: 4vw } }`

  const result = await postcss(plugin({ mediaQuery: true })).process(input, { from: 'example.css' })

  expect(result.css).toEqual(output)
})
