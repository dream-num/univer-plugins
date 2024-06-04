import fs from 'node:fs'
import path from 'node:path'
import { autoImportCss, exportVirtualLocalesModule, virtualLocalesModuleId } from '@univerjs/plugin-core'

export interface IUniverPluginOptions {
  css?: boolean
}

export function univerPlugin(pluginOptions?: IUniverPluginOptions) {
  const { css = true } = pluginOptions ?? {}

  return {
    name: 'univer-plugin',

    setup(build) {
      build.onResolve({ filter: new RegExp(virtualLocalesModuleId) }, (args) => {
        return {
          path: args.path,
          namespace: virtualLocalesModuleId,
        }
      })

      build.onLoad({ filter: /.*/, namespace: virtualLocalesModuleId }, async () => {
        const code = exportVirtualLocalesModule()

        return {
          contents: code,
          loader: 'tsx',
          resolveDir: path.dirname('node_modules'),
        }
      })

      if (css) {
        build.onLoad({ filter: /(\.tsx?$|\.jsx?|\.vue|\.svelte|\.astro)$/ }, async (args) => {
          const code = await fs.promises.readFile(args.path, 'utf8')

          const cssImports = autoImportCss(code)

          if (!cssImports) return

          if (/\.vue$/.test(args.path)) {
            const scriptRegex = /<script([^>]*)>/
            const match = code.match(scriptRegex)
            if (!match) {
              return {
                contents: cssImports + code,
                loader: 'tsx',
              }
            }

            const scriptTag = match[0]
            const newScriptTag = scriptTag.replace(/>$/, `>\n${cssImports}`)

            return {
              contents: code.replace(scriptRegex, newScriptTag),
              loader: 'tsx',
            }
          } else {
            return {
              contents: cssImports + code,
              loader: 'tsx',
            }
          }
        })
      }
    },
  }
}
