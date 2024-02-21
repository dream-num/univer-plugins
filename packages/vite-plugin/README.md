# @univerjs/vite-plugin

## Installation

```bash
npm add @univerjs/vite-plugin
```

## Usage

Add the plugin to your `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import { univerPlugin } from '@univerjs/vite-plugin'

export default defineConfig({
  plugins: [
    univerPlugin()
  ]
})
```

## Features

### Automatic Import of Required CSS

This feature is enabled by default. You can disable it by passing `css: false` to the plugin options.

```diff
export default defineConfig({
  plugins: [
    univerPlugin({
+      css: false
    })
  ]
})
```

### Simplified Import of Language Packs

The plugin provides a virtual module `univer:locales`, which simplifies the import of language packs.

```typescript
import { LocaleType } from '@univerjs/core'

import { zh_CN, en_US } from 'univer:locales'

new Univer({
  locales: {
    [LocaleType.ZH_CN]: zh_CN,
    [LocaleType.EN_US]: en_US
  }
})
```

## TypeScript Support

In order for TypeScript to recognize the `univer:locales` import, you should add a reference to the `src/vite-env.d.ts` file in your project.

```diff
/// <reference types="vite/client" />
+ /// <reference types="@univerjs/vite-plugin/types" />
```

## Options

- `css`: `boolean` - Whether to automatically import required CSS. Default is `true`.
