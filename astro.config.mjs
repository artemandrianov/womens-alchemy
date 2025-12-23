// astro.config.mjs
import path from 'node:path'
import { defineConfig, passthroughImageService } from 'astro/config'

export default defineConfig({
  output: 'static',
  
  site: 'https://xn----7sbbreqalmle2c3c5hh.xn--p1ai',

  image: {
    service: passthroughImageService(),
  },

  vite: {
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
    plugins: [
      {
        name: 'ignore-nullbyte-paths',
        enforce: 'pre',
        resolveId(id) {
          if (id.includes('\x00astro-entry:')) {
            return id
          }
        },
      },
    ],
  },
})