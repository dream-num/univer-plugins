import fs from 'fs';
import path from 'path';
import { generateRandomString } from '@univerjs/plugin-core'

export interface UniverPluginOptions {
  css?: boolean
}

export function univerPlugin (pluginOptions?: UniverPluginOptions) {
  const { css = true } = pluginOptions ?? {};

  const importedPackages = new Set();
  const priorityPackages = ['@univerjs/design', '@univerjs/ui']

  const virtualModuleId = 'univer:locales'
  const virtualModuleNamespace = 'univer-locales';

  return {
    name: 'univer-plugin',

    setup(build) {
      build.onResolve({ filter: virtualModuleId }, (args) => {
        return {
          path: args.path,
          namespace: virtualModuleNamespace,
        };
      });

      build.onLoad({ filter: /.*/, namespace: virtualModuleNamespace }, async () => {
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

          return {
            contents: importStatement + exportStatement,
            loader: 'tsx',
            resolveDir: path.dirname('node_modules')
          };
      });

      if (css) {
        let cssImports = ''

        build.onLoad({ filter: /\.tsx?$|\.jsx?$/ }, async (args) => {
          // 获取文件内容
          let code = await fs.promises.readFile(args.path, 'utf8');

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

          if (cssImports) {
            let priorityCSSImports = ''
            priorityPackages.forEach((pkg) => {
              if (importedPackages.has(pkg)) {
                priorityCSSImports += `import '${pkg}/lib/index.css';\n`
                cssImports = cssImports.replace(`import '${pkg}/lib/index.css';\n`, '')
              }
            })

            return {
              contents: priorityCSSImports + cssImports + code,
              loader: 'tsx', // 或 'jsx'，根据你的需求选择
            };
          }
        });
      }
    },
  };
}
