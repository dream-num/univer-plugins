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
      `import { enUS as [a-zA-Z]{8}enUS } from '@univerjs/ui';\n`
      + `import { zhCN as [a-zA-Z]{8}zhCN } from '@univerjs/ui';\n`
      + `export const enUS = {...[a-zA-Z]{8}enUS,\n`
      + `};\n`
      + `export const zhCN = {...[a-zA-Z]{8}zhCN,\n`
      + `};`,
    )

    expect(expectedStatement.test(outputCode)).toBe(true)
  })
})
