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

  const languages = ['en-US', 'ru-RU', 'zh-CN', 'vi-VN', 'zh-TW', 'fa-IR'].reduce((acc, lang) => {
    acc[lang] = new Set()
    return acc
  }, {})

  let importStatement = `import { Tools as _Tools } from '@univerjs/core';\n`
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
            const langVar = `${lang.replace('-', '')}`

            const key = `${generateRandomString(8)}${langVar}`
            importStatement += `import ${key} from '${packageName}/lib/locale/${lang}';\n`
            languages[lang].add(key)
          }
        })
      }
    }
  }

  Object.keys(languages).forEach((lang) => {
    const langVar = `${lang.replace('-', '')}`

    if (languages[lang].size > 0) {
      exportStatement += `export const ${langVar} = _Tools.deepMerge(`

      languages[lang].forEach((key) => {
        exportStatement += `${key},\n`
      })

      exportStatement += `);\n`
    }
  })

  return importStatement + exportStatement
}
