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
- `[data-reveal]` — 스크롤 진입 시 올라오며 나타남 / `svg[data-draw]` — 선이 그려짐
- `[data-dark]` — 어두운 면: 커스텀 커서가 흰색으로 바뀜 / `data-cursor-label` — 커서 옆 라벨
- `src/components/Doodle.astro` — 손그림 SVG(circle·underline·arrow·star·squiggle·cross·burst·hatch). `#boil` 필터로 선이 떨림. 부모에서 크기 지정 시 `.부모 :global(.클래스)` 로 쓸 것(스코프 스타일이 자식 컴포넌트에 안 닿음)
- `src/data/portfolio.ts` — 작품 목록. `image` 를 넣으면 박스 대신 사진, 키컬러는 이미지 평균색으로 자동
- `src/data/milestone.ts` — 현재 마일스톤 하나. NOW 위치는 브라우저에서 오늘 날짜로 계산

## 페이지 = 기능 하나
- 랜딩: 비주얼만. 빨간 네모(대표 이미지) 던지기, 글자 반응, 시계·좌표. 푸터 없음
- 소개: 격자를 부수는 거대한 대표 이미지(.big) — 사진 교체 지점
- 포트폴리오: 메이슨리 + 필터 + 크게 보기. 활성 작품 색이 배경에 번지고 `--key` 가 물듦
- 마일스톤: 가로 계획표 + NOW
- 홈 버튼 = 내비 왼쪽 빨간 네모 (나중에 대표 이미지로 교체: `.home-square`)

## 검증
- 375 / 390 / 768 / 1024 / 1440 / 1920 + 가로 폰(844×390) 에서 가로 스크롤 없을 것

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
