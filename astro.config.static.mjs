// 临时配置：仅用于本机 Windows 沙箱做静态产物校验（cloudflare 适配器在 workerd 阶段会崩溃）
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://baywalkmanila.com',
  output: 'static',
  outDir: 'dist-static',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap(),
  ],
});
