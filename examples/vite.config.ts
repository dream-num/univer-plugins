import { defineConfig } from 'vite'
import { univerPlugin } from '@univerjs/vite-plugin'

export default defineConfig({
  plugins: [
    univerPlugin(),
  ],
})
