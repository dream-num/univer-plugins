import fs from 'node:fs'
import path from 'node:path'

interface UniverPluginOptions {
  css?: boolean
}

function generateRandomString(length?: number) {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let result = ''

  for (let i = 0; i < length ?? 8; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return result
}

export function univerPlugin(pluginOptions?: UniverPluginOptions) {
  const { css = true } = pluginOptions ?? {}

  const importedPackages = new Set()
  const priorityPackages = ['@univerjs/design', '@univerjs/ui']

  const virtualModuleId = 'univer:locales'
  const resolvedVirtualModuleId = `\0${virtualModuleId}`

  return {
    name: 'univer-plugin',

    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },

    async load(id) {
      /**
       * generate a virtual module that exports all the locales from `@univerjs` and `@univerjs-pro`
       */
      if (id === resolvedVirtualModuleId) {
        const scopes = ['@univerjs', '@univerjs-pro']

        const en_US = new Set()
        const zh_CN = new Set()

        let importStatement = ''
        let exportStatement = ''

        for (const scope of scopes) {
          const scopePath = path.resolve('node_modules', scope)
          if (fs.existsSync(scopePath)) {
            const packagePaths = fs.readdirSync(scopePath)

            for (const packagePath of packagePaths) {
              const packageName = `${scope}/${packagePath}`

              try {
                const enUSPath = path.resolve('node_modules', packageName, 'lib/types/locale/en-US.d.ts')
                const zhCNPath = path.resolve('node_modules', packageName, 'lib/types/locale/zh-CN.d.ts')

                if (fs.existsSync(enUSPath)) {
                  const key = `${generateRandomString(8)}EnUS`

                  importStatement += `import { enUS as ${key} } from '${packageName}';\n`
                  en_US.add(key)
                }
                if (fs.existsSync(zhCNPath)) {
                  const key = `${generateRandomString(8)}ZhCN`

                  importStatement += `import { zhCN as ${key} } from '${packageName}';\n`
                  zh_CN.add(key)
                }
              } catch (err) {
                console.error(err, packageName)
              }
            }
          }

          Array.from(en_US).forEach((key, index) => {
            if (index === 0) {
              exportStatement += `export const en_US = {`
            }
            exportStatement += `...${key},\n`

            if (index === en_US.size - 1) {
              exportStatement += `};\n`
            }
          })

          Array.from(zh_CN).forEach((key, index) => {
            if (index === 0) {
              exportStatement += `export const zh_CN = {`
            }
            exportStatement += `...${key},\n`

            if (index === zh_CN.size - 1) {
              exportStatement += `};\n`
            }
          })
        }

        return importStatement + exportStatement
      }
    },

    transform(code, id) {
      /**
       * auto inject css
       * 1. find all import statements that import from @univerjs and @univerjs-pro
       * 2. check if the package has a CSS file
       * 3. if the package has a CSS file, inject the import statement to the top of the file
       * 4. remove the import statement from the original file
       * 5. return the modified code
       */
      if (css) {
        let cssImports = ''

        // check if the current file being processed is a JavaScript or TypeScript file
        if (!/\.tsx?$|\.jsx?$/.test(id)) return

        // find all import statements that import from @univerjs and @univerjs-pro
        const univerImportRegex = /import\s+.*\s+from\s+['"]@(univerjs(-pro)?\/[^'"]+)['"]/g
        let match

        // eslint-disable-next-line no-cond-assign
        while ((match = univerImportRegex.exec(code)) !== null) {
          const packageName = `@${match[1]}` // 提取包名称

          // if the package has not been imported yet
          if (!importedPackages.has(packageName)) {
            const cssFilePath = path.resolve('node_modules', packageName, 'lib/index.css')

            if (fs.existsSync(cssFilePath)) {
              cssImports += `import '${packageName}/lib/index.css';\n`
            }

            importedPackages.add(packageName)
          }
        }

        // extract the CSS import statements from the code
        if (cssImports) {
          // deal with priority packages
          let priorityCSSImports = ''
          priorityPackages.forEach((pkg) => {
            if (importedPackages.has(pkg)) {
              priorityCSSImports += `import '${pkg}/lib/index.css';\n`
              cssImports = cssImports.replace(`import '${pkg}/lib/index.css';\n`, '')
            }
          })

          return {
            code: priorityCSSImports + cssImports + code,
            map: null,
          }
        }
      }
    },
  }
}
