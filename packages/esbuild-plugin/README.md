# @univerjs/esbuild-plugin

## Installation

```bash
npm install @univerjs/esbuild-plugin
```

## Usage

If you are using the `esbuild` API, you can add the plugin to your build configuration:

```typescript
import esbuild from 'esbuild'

esbuild.build({
  plugins: [
    univerPlugin()
  ],
})
```

## Features

### Automatic Import of Required CSS

This feature is enabled by default. You can disable it by passing `css: false` to the plugin options.

```diff
esbuild.build({
  plugins: [
    univerPlugin({
+     css: false
    })
  ],
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

In order for TypeScript to recognize the `univer:locales` import, you should add a reference to the `tsconfig.json` file in your project.

```diff
{
  "compilerOptions": {
+    "types": ["@univerjs/esbuild-plugin/types"]
  }
}
```

## Options

- `css`: `boolean` - Whether to automatically import required CSS. Default is `true`.
