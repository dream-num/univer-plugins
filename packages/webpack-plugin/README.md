# @univerjs/webpack-plugin

## Installation

```bash
npm install @univerjs/webpack-plugin
```

## Usage

Add the plugin to your `webpack.config.js`:

```typescript
import { UniverPlugin } from '@univerjs/webpack-plugin'

export default {
  plugins: [
    +new UniverPlugin()
  ]
}
```

## Features

### Automatic Import of Required CSS

This feature is enabled by default. You can disable it by passing `css: false` to the plugin options.

```diff
export default defineConfig({
  plugins: [
    new UniverPlugin({
+      css: false
    })
  ]
})
```

### Simplified Import of Language Packs

The plugin provides a virtual module `univer:locales`, which simplifies the import of language packs.

```typescript
import { LocaleType } from '@univerjs/core'

import { enUS, faIR, frFR, ruRU, viVN, zhCN, zhTW } from 'univer:locales'

new Univer({
  locales: {
    [LocaleType.ZH_CN]: zhCN,
    [LocaleType.EN_US]: enUS,
    [LocaleType.RU_RU]: ruRU,
    [LocaleType.VI_VN]: viVN,
    [LocaleType.ZH_TW]: zhTW,
    [LocaleType.FA_IR]: faIR,
    [LocaleType.FR_FR]: frFR,
  }
})
```

## TypeScript Support

In order for TypeScript to recognize the `univer:locales` import, you should add a reference to the `src/webpack-env.d.ts` file in your project.

```diff
+ /// <reference types="@univerjs/webpack-plugin/types" />
```

## Options

- `css`: `boolean` - Whether to automatically import required CSS. Default is `true`.
