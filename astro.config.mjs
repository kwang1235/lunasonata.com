// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://blog.lunasonata.com',
  output: 'static',
  integrations: [mdx(), sitemap()],

  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },

  vite: {
    plugins: [
      tailwindcss(),
      // 💡 한글 파일명이 Vite 빌드 시 깨져서 404 나는 것을 방지하는 디코딩 플러그인
      {
        name: 'fix-korean-asset-names',
        enforce: 'pre',
        resolveId(source) {
          if (source.includes('%')) {
            try {
              return decodeCrossRef(source);
            } catch (e) {
              return null;
            }
          }
          return null;
        }
      }
    ],
  },
});

function decodeCrossRef(str) {
  try {
    return decodeURIComponent(str);
  } catch (e) {
    return str;
  }
}