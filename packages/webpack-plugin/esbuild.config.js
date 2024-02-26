const esbuild = require('esbuild')

/** @type {import('esbuild').BuildOptions} */
const config = {
  bundle: true,
  platform: 'node',
  target: ['node16'],
  entryPoints: {
    index: './src/index.ts',
    loader: './src/loader.ts',
  },
  external: ['webpack', './src/loader'],
  format: 'cjs',
  outdir: './lib',
}

esbuild.buildSync(config)
