import fs from 'node:fs'
import path from 'node:path'
import { handleCSS, handleLocales, virtualLocalesModuleId } from '@univerjs/plugin-core'

export interface UniverPluginOptions {
  css?: boolean
}

export function univerPlugin(pluginOptions?: UniverPluginOptions) {
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
        const code = handleLocales()

        return {
          contents: code,
          loader: 'tsx',
          resolveDir: path.dirname('node_modules'),
        }
      })

      if (css) {
        build.onLoad({ filter: /\.tsx?$|\.jsx?$/ }, async (args) => {
          const code = await fs.promises.readFile(args.path, 'utf8')

          const cssImports = handleCSS(code)

          if (cssImports) {
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
