// @ts-check
import path from 'node:path'

import { defineConfig, passthroughImageService } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'server',

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
          // Skip any Astro virtual modules (null byte in path)
          if (id.includes('\x00astro-entry:')) {
            return id // leave untouched so Astro handles it
          }
        },
      },
    ],
  },
});
