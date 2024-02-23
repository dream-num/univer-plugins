import mockFs from 'mock-fs'

import { autoImportCss } from '../auto-import-css'

describe('auto-import-css', () => {
  beforeEach(() => {
    mockFs({
      'node_modules/@univerjs/design/lib/index.css': '/* univerjs design css */',
      'node_modules/@univerjs/ui/lib/index.css': '/* univerjs ui css */',
    })
  })

  afterEach(() => {
    mockFs.restore()
  })

  it('should generate import statements for CSS files', () => {
    const inputCode = `import something from '@univerjs/design';\nimport otherThing from '@univerjs/ui';`
    const outputCode = autoImportCss(inputCode)

    const expectedImportStatementDesign = `import '@univerjs/design/lib/index.css';\n`
    const expectedImportStatementUI = `import '@univerjs/ui/lib/index.css';\n`

    expect(outputCode).toContain(expectedImportStatementDesign)
    expect(outputCode).toContain(expectedImportStatementUI)
  })

  it('should prioritize @univerjs/design over @univerjs/ui', () => {
    const inputCode = `import something from '@univerjs/ui';\nimport otherThing from '@univerjs/design';`
    const outputCode = autoImportCss(inputCode)

    const designImportIndex = outputCode.indexOf('@univerjs/design')
    const uiImportIndex = outputCode.indexOf('@univerjs/ui')

    expect(designImportIndex).toBeLessThan(uiImportIndex)
  })
})
