// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://blog.lunasonata.com',
  output: 'static',
  integrations: [mdx(), sitemap()],

  // 💡 Astro 이미지 자동 변환 엔진
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },

  // 💡 <Font /> 컴포넌트가 참조하는 Atkinson 폰트 설정 복구
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Atkinson',
      cssVariable: '--font-atkinson',
      fallbacks: ['sans-serif'],
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/atkinson-regular.woff'],
            weight: 400,
            style: 'normal',
            display: 'swap',
          },
          {
            src: ['./src/assets/fonts/atkinson-bold.woff'],
            weight: 700,
            style: 'normal',
            display: 'swap',
          },
        ],
      },
    },
  ],

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
              return decodeURIComponent(source);
            } catch (e) {
              return null;
            }
          }
          return null;
        },
      },
    ],
  },
});