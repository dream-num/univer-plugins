import path from 'node:path'
import fs from 'node:fs'
import mockFs from 'mock-fs'
import { webpack } from 'webpack'
import { UniverPlugin } from '..'
import loader from '../loader'

describe('auto-import-locale', () => {
  it('should work correctly', (done) => {
    const compiler = webpack({
      entry: require.resolve('./src/index.js'),
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        assetModuleFilename: 'assets/[name][ext]',
      },
      plugins: [new UniverPlugin({
        css: true,
      })],
      module: {
        rules: [
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
        ],
      },

      optimization: {
        minimize: false,
      },
    })
    compiler.run((err) => {
      if (err) {
        done(err)
      }
      done()
    })
  }, 30000)
})

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
  // loader
  it('should transform correctly', () => {
    const inputCode = `import something from '@univerjs/design';\nimport otherThing from '@univerjs/ui';`
    const outputCode = loader(inputCode)

    const expectedImportStatementDesign = `import '@univerjs/design/lib/index.css';\n`
    const expectedImportStatementUI = `import '@univerjs/ui/lib/index.css';\n`

    expect(outputCode).toContain(expectedImportStatementDesign)
    expect(outputCode).toContain(expectedImportStatementUI)
  })
})
