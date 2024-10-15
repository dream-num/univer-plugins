import { univerPlugin } from '@univerjs/esbuild-plugin'
import esbuild from 'esbuild'
import stylePlugin from 'esbuild-style-plugin'

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

console.log(`Local server: http://localhost:3010`)
