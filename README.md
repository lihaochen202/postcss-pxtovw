# postcss-pxtovw

A plugin for [PostCSS](https://github.com/ai/postcss) that generates vw units from pixel units.

## Note

As described above, the basic functions are available now, and I'm trying to improve the other features. If you want to use it, please think again!

## Install

```shell
npm i postcss-pxtovw -D
```

## Input/Output

```css
/* input */
h1 {
  margin: 0 0 20px;
  font-size: 32px;
  line-height: 1.2;
  letter-spacing: 1px;
}

/* output */
h1 {
  margin: 0 0 5.33333vw;
  font-size: 8.53333vw;
  line-height: 1.2;
  letter-spacing: 1px;
}
```

## Options

- `viewportWidth`(number): The width of the viewport, default value is `375`.
- `unitPrecision`(number): The decimal numbers to allow the vw units to grow to, default value is `5`.
- `minPixelValue`(number): Set the minimum pixel value to replace, default value is `1`.
- `include`(RegExp[]): Only matching files will be converted, default value is `[/.*/]`.
- `exclude`(RegExp[]): Ignore matching files like 'node_modules', default value is `[]`.
