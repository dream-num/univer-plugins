import type { Compiler } from 'webpack'
import { Buffer } from 'node:buffer'
import { exportVirtualLocalesModule, virtualLocalesModuleId } from '@univerjs/plugin-core'

import { NormalModule } from 'webpack'

export interface IUniverPluginOptions {
  css?: boolean
}

const nodeRequire = require

export class UniverPlugin {
  private name = 'UniverPlugin'

  constructor(private options: IUniverPluginOptions = {}) {
    if (options.css === undefined) {
      options.css = true
    }
  }

  apply(compiler: Compiler) {
    this.virtualLocalesModule(compiler)
    if (this.options.css) {
      this.autoImportCSS(compiler)
    }
  }

  private virtualLocalesModule(compiler: Compiler) {
    if (NormalModule) {
      // webpack 5
      compiler.hooks.compilation.tap(this.name, (compilation) => {
        NormalModule.getCompilationHooks(compilation).readResourceForScheme.for(virtualLocalesModuleId.split(':')[0]).tap(this.name, (path) => {
          if (path === virtualLocalesModuleId) {
            if (typeof compiler.options.target === 'string' && compiler.options.target.startsWith('node')) {
              return ''
            }
            return exportVirtualLocalesModule()
          } else {
            return path
          }
        })
      })
    } else {
      // webpack 4
      const readFileOrigin = compiler.inputFileSystem.readFile
      const statOrigin = compiler.inputFileSystem.stat
      compiler.inputFileSystem.stat = function (path, callback) {
        if (path.includes(virtualLocalesModuleId)) {
          return callback(null, {
            isFile: () => true,
          } as any)
        }
        return statOrigin.apply(this, [path, callback])
      }
      compiler.inputFileSystem.readFile = function (path, callback) {
        if (path.includes(virtualLocalesModuleId)) {
          if (/package\.json$/.test(path)) {
            return callback(null, Buffer.from('{}'))
          } else {
            return callback(null, Buffer.from(exportVirtualLocalesModule()))
          }
        }
        return readFileOrigin.apply(this, [path, callback])
      }
    }
  }

  private autoImportCSS(compiler: Compiler) {
    compiler.hooks.compilation.tap(this.name, (compilation) => {
      const rule = /(\.tsx?$|\.jsx?|\.vue|\.svelte|\.astro)$/
      if (NormalModule) {
        // webpack 5
        NormalModule.getCompilationHooks(compilation).loader.tap(this.name, (_loaderContext, module) => {
          if (module.resource && rule.test(module.resource) && !module.resource.includes('node_modules')) {
            module.loaders.unshift({
              ident: 'add-import-css',
              loader: nodeRequire.resolve('./loader'),
              type: null,
              options: {},
            })
          }
        })
      } else {
        // webpack 4
        compilation.hooks.normalModuleLoader.tap(this.name, (_loaderContext, module) => {
          if (module.resource && rule.test(module.resource) && !module.resource.includes('node_modules')) {
            module.loaders.unshift({
              ident: 'add-import-css',
              loader: nodeRequire.resolve('./loader'),
              type: null,
              options: {},
            })
          }
        })
      }
    })
  }
}
