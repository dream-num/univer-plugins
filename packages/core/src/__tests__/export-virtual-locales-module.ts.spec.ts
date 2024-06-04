import mockFs from 'mock-fs'

import { exportVirtualLocalesModule } from '../export-virtual-locales-module'

describe('export-virtual-locales-module', () => {
  beforeEach(() => {
    mockFs({
      'node_modules/@univerjs/ui/lib/types/locale/en-US.d.ts': '/* en-US locale */',
      'node_modules/@univerjs/ui/lib/types/locale/zh-CN.d.ts': '/* zh-CN locale */',
      'node_modules/@univerjs/ui/lib/types/locale/ru-RU.d.ts': '/* ru-RU locale */',
      'node_modules/@univerjs/design/lib/index.css': '/* univerjs design css */',
    })
  })

  afterEach(() => {
    mockFs.restore()
  })

  it('should generate export statements for locales', () => {
    const outputCode = exportVirtualLocalesModule()

    expect(outputCode).toMatch(/import { Tools as _Tools } from '@univerjs\/core';/)
    expect(outputCode).toMatch(/import [a-zA-Z]{8}enUS from '@univerjs\/ui\/lib\/locale\/en-US';/)
    expect(outputCode).toMatch(/import [a-zA-Z]{8}ruRU from '@univerjs\/ui\/lib\/locale\/ru-RU';/)
    expect(outputCode).toMatch(/import [a-zA-Z]{8}zhCN from '@univerjs\/ui\/lib\/locale\/zh-CN';/)

    expect(outputCode).toMatch(/export const enUS = _Tools.deepMerge\([a-zA-Z]{8}enUS,\n\);/)
    expect(outputCode).toMatch(/export const ruRU = _Tools.deepMerge\([a-zA-Z]{8}ruRU,\n\);/)
    expect(outputCode).toMatch(/export const zhCN = _Tools.deepMerge\([a-zA-Z]{8}zhCN,\n\);/)
  })
})
