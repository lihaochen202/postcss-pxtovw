# postcss-pxtovw

A plugin for [PostCSS](https://github.com/ai/postcss) that generates vw units from pixel units.

## Install

```shell
npm i @lihaochen/postcss-pxtovw -D
```

## Setup

```js
// postcss.config.js
module.exports = {
  plugins: {
    '@lihaochen/postcss-pxtovw': {}
  }
}
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
- `include`(Rule[]): Only matching files will be converted, default value is `[/.*/]`.
- `exclude`(Rule[]): Ignore matching files like 'node_modules', default value is `[]`.
- `includeProps`(Rule[]): Only matching properies will be converted, default value is `[/.*/]`.
- `excludeProps`(Rule[]): Ignore matching properies like 'font-size', default value is `[]`.
- `includeSelectors`(Rule[]): Only matching selectors will be converted, default value is `[/.*/]`.
- `excludeSelectors`(Rule[]): Ignore matching selectors like '.ignore', default value is `[]`.
- `mediaQuery`(boolean): Allow px to be converted in media queries.

> The type `Rule` is defined as `type Rule = string | RegExp | Function`.
>
> - `string`: Include given value, like `String.prototype.includes`.
> - `RegExp`: By regular matching.
> - `Function`: When the return value is true, matching.

## Examples

### Set reference value

```js
// postcss.config.js
module.exports = {
  plugins: {
    '@lihaochen/postcss-pxtovw': {
      viewportWidth: 750,
      unitPrecision: 3,
      minPixelValue: 1
    }
  }
}
```

### Process specified file

```js
// postcss.config.js
module.exports = {
  plugins: {
    '@lihaochen/postcss-pxtovw': {
      // Only process files containing the 'src/views/mobile' path.
      include: ['src/views/mobile'],
      // Do not process files containing the 'node_modules' path.
      exclude: ['node_modules']
    }
  }
}
```

### Process specified properties

```js
// postcss.config.js
module.exports = {
  plugins: {
    '@lihaochen/postcss-pxtovw': {
      // Only process properies containing the 'font' name, like 'font-size'.
      includeProps: ['font'],
      // Do not process properies containing the 'margin' name, like 'margin'/'margin-top'/'margin-bottom'.
      includeProps: ['margin']
    }
  }
}
```

### Process specified selectors

```js
// postcss.config.js
module.exports = {
  plugins: {
    '@lihaochen/postcss-pxtovw': {
      // Only process selectors containing the 'src/views/mobile' name, like '.mobile'/'.mobile-title'.
      includeSelectors: ['mobile'],
      // Do not process selectors containing the 'ignore' name, like '.ignore'/'.ignore-rule'.
      includeSelectors: ['node_modules']
    }
  }
}
```

### Ignore by comment

#### Input

```css
/* pxtovw-ignore */
.rule {
  width: 20px;
  height: 20px;
  font-size: 15px;
}
.rule {
  width: 20px;
  height: 20px;
  /* pxtovw-ignore */
  font-size: 15px;
}
```

#### Output

```css
.rule {
  width: 20px;
  height: 20px;
  font-size: 15px;
}
.rule {
  width: 5.33333vw;
  height: 5.33333vw;
  font-size: 15px;
}
```

# Thanks

- [postcss-pxtorem](https://github.com/cuth/postcss-pxtorem)
- [postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport)
- [vite](https://github.com/vitejs/vite)
- [vitest](https://github.com/vitest-dev/vitest)
