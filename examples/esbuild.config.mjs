import esbuild from 'esbuild'
import stylePlugin from 'esbuild-style-plugin'
import { univerPlugin } from '@univerjs/esbuild-plugin'

const ctx = await esbuild.context({
  bundle: true,
  color: true,
  plugins: [
    stylePlugin(),
    univerPlugin(),
  ],
  entryPoints: ['./src/main.ts'],
  outdir: './local',
})

await ctx.watch()

await ctx.serve({
  servedir: './local',
  port: 3010,
})

// eslint-disable-next-line no-console
console.log(`Local server: http://localhost:3010`)
