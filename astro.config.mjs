import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'server',
  adapter: cloudflare({ imageService: 'compile' }),
  session: false,
  site: 'https://rakhi-battle.workers.dev',
  vite: {
    build: { minify: true },
  },
});
