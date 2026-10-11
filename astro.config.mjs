// @ts-check
import { defineConfig } from 'astro/config';

// 배포 주소가 정해지면 site / base 를 채운다.
// - GitHub Pages (username.github.io/repo): site: 'https://username.github.io', base: '/repo'
// - Cloudflare Pages / 커스텀 도메인: site 만 지정, base 생략
export default defineConfig({
  site: process.env.SITE_URL,
  base: process.env.BASE_PATH,
  trailingSlash: 'ignore',

  // 링크에 마우스를 올리면 다음 페이지를 미리 받아둔다 → 이동이 즉시 일어난다
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },

  build: {
    // 작은 CSS 는 HTML 에 인라인 → 첫 렌더 요청 수 감소
    inlineStylesheets: 'auto',
  },
});
