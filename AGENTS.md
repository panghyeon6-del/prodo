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
- `src/data/portfolio.ts` — 작품 목록(src/assets/works/)
- `src/data/milestone.ts` — 현재 마일스톤 하나. NOW 위치는 브라우저에서 오늘 날짜로 계산

## 페이지 = 기능 하나
- 랜딩 = 소개(/about 은 / 로 리다이렉트): 가운데 대표 이미지(src/assets/me.jpg) + 왼쪽 소개 + 오른쪽 연락 버튼 + 아래 연락처. 연락처는 `src/lib/site.ts` 의 CONTACTS
- 포트폴리오: 가로 캐러셀(정사각형) + 필터 + 크게 보기(원본 비율). 작품 설명은 data 의 desc, 크롭 기준은 focus
- 마일스톤: 가로 계획표 + NOW
- 홈 버튼 = 내비 왼쪽 빨간 네모

## 톤: 미니멀
- 흰 바탕, 장식 최소. 수채 얼룩·배경 번짐은 제거함(사용자 요청). 그림이 주인공
- 여백: `--gutter`(폭의 6%), `--space-y`(위아래 숨). 새 섹션도 이 두 값으로 간격을 잡을 것
- 남은 장치: 두들(불꽃·NOW 동그라미·말풍선), 하단 `Stripe.astro` 삼색 띠, 빨강 단일 강조색

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
