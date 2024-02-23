import fs from 'node:fs'
import path from 'node:path'

export function generateRandomString(length) {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const len = length ?? 8

  let result = ''

  for (let i = 0; i < len; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return result
}

export const virtualLocalesModuleId = 'univer:locales'
export function handleLocales() {
  const scopes = ['@univerjs', '@univerjs-pro']

  const languages = ['en-US', 'zh-CN'].reduce((acc, lang) => {
    acc[lang] = new Set()
    return acc
  }, {})

  let importStatement = ''
  let exportStatement = ''

  for (const scope of scopes) {
    const scopePath = path.resolve('node_modules', scope)
    if (fs.existsSync(scopePath)) {
      const packagePaths = fs.readdirSync(scopePath)

      for (const packagePath of packagePaths) {
        const packageName = `${scope}/${packagePath}`

        try {
          Object.keys(languages).forEach((lang) => {
            const langPath = path.resolve('node_modules', packageName, 'lib/types/locale', `${lang}.d.ts`)

            if (fs.existsSync(langPath)) {
              const key = `${generateRandomString(8)}${lang}`
              importStatement += `import { ${lang} as ${key} } from '${packageName}';\n`
              languages[lang].add(key)
            }
          })
        } catch (err) {
          console.error(err, packageName)
        }
      }
    }
  }

  Object.keys(languages).forEach((lang) => {
    if (languages[lang].size > 0) {
      exportStatement += `export const ${lang} = {`

      languages[lang].forEach((key) => {
        exportStatement += `...${key},\n`
      })

      exportStatement += `};\n`
    }
  })

  return importStatement + exportStatement
}

/**
 * auto inject css
 * 1. find all import statements that import from @univerjs and @univerjs-pro
 * 2. check if the package has a CSS file
 * 3. if the package has a CSS file, inject the import statement to the top of the file
 * 4. remove the import statement from the original file
 * 5. return the modified code
 */
export function handleCSS(code: string): string {
  const priorityPackages = ['@univerjs/design', '@univerjs/ui']
  const importedPackages = new Set()

  let cssImports = ''

  // find all import statements that import from @univerjs and @univerjs-pro
  const univerImportRegex = /import\s+.*\s+from\s+['"]@(univerjs(-pro)?\/[^'"]+)['"]/g
  let match

  // eslint-disable-next-line no-cond-assign
  while ((match = univerImportRegex.exec(code)) !== null) {
    const packageName = `@${match[1]}`

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

    cssImports = priorityCSSImports + cssImports
  }

  return cssImports
}
