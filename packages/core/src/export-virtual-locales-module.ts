import fs from 'node:fs'
import path from 'node:path'
import { generateRandomString } from './utils'

export const virtualLocalesModuleId = 'univer:locales'

/**
 * Generates a virtual module that exports all the locales from `@univerjs` and `@univerjs-pro`.
 *
 * @returns {string} A string containing the import and export statements for all the locales from `@univerjs` and `@univerjs-pro`.
 */
export function exportVirtualLocalesModule() {
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

        Object.keys(languages).forEach((lang) => {
          const langPath = path.resolve('node_modules', packageName, 'lib/types/locale', `${lang}.d.ts`)

          if (fs.existsSync(langPath)) {
            const key = `${generateRandomString(8)}${lang}`
            importStatement += `import { ${lang} as ${key} } from '${packageName}';\n`
            languages[lang].add(key)
          }
        })
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