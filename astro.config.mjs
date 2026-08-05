// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.lunasonata.com', // 세광 님의 실제 도메인 적용
  output: 'static',                   // 서버 사이드 랜더링(SSR) 설정
  integrations: [mdx(), sitemap()],

  // 💡 이미지 최적화 관련 설정 추가
  image: {
    // 빌드 시 포맷을 지정하지 않은 이미지들의 기본 변환 포맷 설정 (기본적으로 webp/avif로 처리됨)
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },

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
    plugins: [tailwindcss()],
  },
});