import fs from 'node:fs'
import path from 'node:path'

/**
 * auto inject css
 * 1. find all import statements that import from @univerjs and @univerjs-pro
 * 2. check if the package has a CSS file
 * 3. if the package has a CSS file, inject the import statement to the top of the file
 * 4. remove the import statement from the original file
 * 5. return the modified code
 *
 * @param {string} code - The code to be processed.
 */
export function autoImportCss(code: string): string {
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
