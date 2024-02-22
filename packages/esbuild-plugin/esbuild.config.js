const esbuild = require('esbuild')

/** @type {import('esbuild').BuildOptions} */
const config = {
  bundle: true,
  platform: 'node',
  target: ['node16'],
  entryPoints: {
    index: './src/index.ts',
  },
  format: 'cjs',
  outdir: './lib',
}

esbuild.buildSync(config)
