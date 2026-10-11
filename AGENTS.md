# 개인 페이지

정적 사이트(Astro) → GitHub Pages / Cloudflare Pages 무료 배포. 서버·유료 서비스 없음.

## 명령
- `npm run dev` — 개발 서버 (localhost:4321)
- `npm run check` — 타입 검사
- `npm run build` / `npm run preview` — 프로덕션 빌드 확인

## 구조
- `src/lib/site.ts` — 페이지 목록(ROUTES). 내비·푸터·숫자키 단축키가 모두 여기서 읽음. 링크는 반드시 `url()` 로 감쌀 것(배포 하위 경로 대응)
- `src/layouts/Base.astro` — ClientRouter(페이지 전환), Nav, Footer, 모션 런타임
- `src/scripts/motion.ts` — Lenis + GSAP ScrollTrigger. `astro:page-load` 에서 초기화, `astro:before-swap` 에서 정리. 페이지별 애니메이션은 `motion:ready` 이벤트에서 등록(gsap.context 안에서 실행되어 자동 정리됨)
- `[data-reveal]` — 스크롤 진입 시 올라오며 나타남
- `src/components/Placeholder.astro` — 사진 자리. `ratio` 로 레이아웃 밀림 방지. 사진은 나중에 `astro:assets` `<Image>` 로 교체

## 디자인 규칙 (src/styles/tokens.css)
- 서체: Pretendard 단독(self-host, 동적 서브셋). 세리프는 이탤릭 포인트 한두 낱말에만
- 굵기: 900(디스플레이) / 700(제목) / 500(본문·라벨)만. 한 화면에 인접 굵기 금지, 300 이하 금지
- 디스플레이 자간 −0.045em 행간 0.86(한글 1.05), 한글 `word-break: keep-all`
- 색: 종이 #dcdad5 / 잉크 #111 / 빨강 #d62f2a(유일한 강조색) / 흰색 #f2f2f0
- 크기 수열 1.333, 12단 격자, 1px 선
- 모든 모션은 `prefers-reduced-motion` 존중

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
