import { test, expect } from 'vitest'
import postcss from 'postcss'
import plugin from '.'

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
