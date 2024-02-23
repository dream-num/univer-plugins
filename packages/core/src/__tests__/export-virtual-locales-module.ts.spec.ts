import mockFs from 'mock-fs'

import { exportVirtualLocalesModule } from '../export-virtual-locales-module'

describe('export-virtual-locales-module', () => {
  beforeEach(() => {
    mockFs({
      'node_modules/@univerjs/ui/lib/types/locale/en-US.d.ts': '/* en-US locale */',
      'node_modules/@univerjs/ui/lib/types/locale/zh-CN.d.ts': '/* zh-CN locale */',
      'node_modules/@univerjs/design/lib/index.css': '/* univerjs design css */',
    })
  })

  afterEach(() => {
    mockFs.restore()
  })

  it('should generate export statements for locales', () => {
    const outputCode = exportVirtualLocalesModule()

    const expectedStatement = new RegExp(
      `import { en-US as [a-zA-Z]{10}-US } from '@univerjs/ui';\n`
      + `import { zh-CN as [a-zA-Z]{10}-CN } from '@univerjs/ui';\n`
      + `export const en-US = {...[a-zA-Z]{10}-US,\n`
      + `};\n`
      + `export const zh-CN = {...[a-zA-Z]{10}-CN,\n`
      + `};`,
    )

    expect(expectedStatement.test(outputCode)).toBe(true)
  })
})
