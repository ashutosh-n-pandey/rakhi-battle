import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'server',
  adapter: cloudflare({ imageService: 'compile' }),
  session: false,
  site: 'https://bondbop.com',
  vite: {
    build: { minify: true },
  },
});
