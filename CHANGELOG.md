

# [0.5.0](https://github.com/dream-num/univer-plugins/compare/v0.4.4...v0.5.0) (2024-07-15)


### Features

* support `zh-TW` & `vi-VN` ([d1084af](https://github.com/dream-num/univer-plugins/commit/d1084af72bec0a65c16c8a77432a11dd6fab9afd))

## [0.4.4](https://github.com/dream-num/univer-plugins/compare/v0.4.3...v0.4.4) (2024-06-18)


### Bug Fixes

* **webpack:** exclude node_modules path in rule evaluation conditions ([bf06b43](https://github.com/dream-num/univer-plugins/commit/bf06b4398a11a8b70eab27b8c6ff9507958f7a58))

## [0.4.3](https://github.com/dream-num/univer-plugins/compare/v0.4.2...v0.4.3) (2024-06-04)


### Bug Fixes

* fix issues when inject CSS imports in Vue SFCs ([6a9eddd](https://github.com/dream-num/univer-plugins/commit/6a9eddd38d727e89f330c7bd4e972f347cc69eac))

## [0.4.2](https://github.com/dream-num/univer-plugins/compare/v0.4.1...v0.4.2) (2024-06-04)


### Bug Fixes

* **webpack4:** fix import statement for locale files ([d9ef06f](https://github.com/dream-num/univer-plugins/commit/d9ef06f54c283de8298a9f92c1da1b85b9cee140))

## [0.4.1](https://github.com/dream-num/univer-plugins/compare/v0.4.0...v0.4.1) (2024-06-03)


### Bug Fixes

* resolve issue with applying styles to Vue SFCs ([c21b0f7](https://github.com/dream-num/univer-plugins/commit/c21b0f7b0cfed80625d0f8aef3d173266e1c0512))

# [0.4.0](https://github.com/dream-num/univer-plugins/compare/v0.3.5...v0.4.0) (2024-06-03)


### Features

* ensure compatibility with Univer version 0.1.13 and above ([b24a561](https://github.com/dream-num/univer-plugins/commit/b24a561a37fa3013b766e03636c77d3ec4719755))

## [0.3.5](https://github.com/dream-num/univer-plugins/compare/v0.3.4...v0.3.5) (2024-05-16)


### Bug Fixes

* fix test case ([8e4b4a1](https://github.com/dream-num/univer-plugins/commit/8e4b4a1a11b43807175ac62f335c68d19c1d488e))

## [0.3.4](https://github.com/dream-num/univer-plugins/compare/v0.3.3...v0.3.4) (2024-05-16)


### Features

* add Russian (ruRU) locale support ([cfdf09d](https://github.com/dream-num/univer-plugins/commit/cfdf09d9420963b8fb876d5b4fe28eac19283111))

## [0.3.3](https://github.com/dream-num/univer-plugins/compare/v0.3.2...v0.3.3) (2024-05-11)


### Bug Fixes

* **webpack:** add environment check to skip plugin execution in Node.js for Next.js compatibility ([a6e305d](https://github.com/dream-num/univer-plugins/commit/a6e305d30f734a3143b1b2a2d46cdf10ff298393))

## [0.3.2](https://github.com/dream-num/univer-plugins/compare/v0.3.1...v0.3.2) (2024-03-21)

## [0.3.1](https://github.com/dream-num/univer-plugins/compare/v0.3.0...v0.3.1) (2024-03-21)


### Features

* extend onLoad filter to include .svelte and .astro files in build process ([c75bce8](https://github.com/dream-num/univer-plugins/commit/c75bce8eac321fc4def7adb98e455ee5e97c81ac))

# [0.3.0](https://github.com/dream-num/univer-plugins/compare/v0.2.6...v0.3.0) (2024-02-27)


### Bug Fixes

* change locale file names and variable names ([#4](https://github.com/dream-num/univer-plugins/issues/4)) ([1ecee3d](https://github.com/dream-num/univer-plugins/commit/1ecee3d16447e499b74fc07204c05f7510f48244))
* fix variable name ([d86e4a2](https://github.com/dream-num/univer-plugins/commit/d86e4a2e2a1504c1c9355b505b0f5d9863775255))


### Features

* webpack plugin ([#3](https://github.com/dream-num/univer-plugins/issues/3)) ([d7e5353](https://github.com/dream-num/univer-plugins/commit/d7e53537d4bb5d8f38a43f50f47e7246f51f5e3f))

## [0.2.6](https://github.com/dream-num/univer-plugins/compare/v0.2.5...v0.2.6) (2024-02-23)

## [0.2.5](https://github.com/dream-num/univer-plugins/compare/v0.2.4...v0.2.5) (2024-02-23)


### Bug Fixes

* fix lint ([4b2d3b2](https://github.com/dream-num/univer-plugins/commit/4b2d3b28d0ac396e6c7a0434aa86474e5b994617))
* rename `UniverPluginOptions` to `IUniverPluginOptions` ([9cd31a0](https://github.com/dream-num/univer-plugins/commit/9cd31a0d9e23a18f9deeb046512578fc7f06fb7c))

## [0.2.4](https://github.com/dream-num/univer-plugins/compare/v0.2.3...v0.2.4) (2024-02-22)


### Bug Fixes

* **esbuild-plugin:** ensure build.onResolve filter is a RegExp in esbuild configuration ([4014a7d](https://github.com/dream-num/univer-plugins/commit/4014a7dba8ad80e28d8f75bd5ea8371c4f2864f2))

## [0.2.3](https://github.com/dream-num/univer-plugins/compare/v0.2.2...v0.2.3) (2024-02-22)


### Bug Fixes

* **esbuild-plugin:** handle undefined pluginOptions with default object in destructuring assignment ([8d1c0c1](https://github.com/dream-num/univer-plugins/commit/8d1c0c1bf49356ccc0b35beaa29acc733795eb62))

## [0.2.2](https://github.com/dream-num/univer-plugins/compare/v0.1.1...v0.2.2) (2024-02-22)


### Bug Fixes

* **bundle:** include missing dependencies ([ce23ad9](https://github.com/dream-num/univer-plugins/commit/ce23ad97823fe28c34960261d5bb300900c65229))


### Features

* create esbuild plugin ([1efe50d](https://github.com/dream-num/univer-plugins/commit/1efe50da373ddc3867ba9a7dd54af712f624d42b))

## [0.2.1](https://github.com/dream-num/univer-plugins/compare/v0.2.0...v0.2.1) (2024-02-22)


### Bug Fixes

* **bundle:** include missing dependencies ([00217db](https://github.com/dream-num/univer-plugins/commit/00217db312f31668feb84ca1adfaf202bac0d6a7))

# [0.2.0](https://github.com/dream-num/univer-plugins/compare/v0.1.1...v0.2.0) (2024-02-22)


### Features

* create esbuild plugin ([1efe50d](https://github.com/dream-num/univer-plugins/commit/1efe50da373ddc3867ba9a7dd54af712f624d42b))
