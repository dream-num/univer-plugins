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
      `import { en_US as [a-zA-Z]{10}_US } from '@univerjs/ui';\n`
      + `import { zh_CN as [a-zA-Z]{10}_CN } from '@univerjs/ui';\n`
      + `export const en_US = {...[a-zA-Z]{10}_US,\n`
      + `};\n`
      + `export const zh_CN = {...[a-zA-Z]{10}_CN,\n`
      + `};`,
    )

    expect(expectedStatement.test(outputCode)).toBe(true)
  })
})
