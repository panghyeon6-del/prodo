// 전역 모션 런타임 — 모든 페이지에서 한 번 로드된다.
// ClientRouter 가 페이지를 바꿀 때마다 page-load 에서 초기화, before-swap 에서 정리한다.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { ROUTES, url } from '../lib/site';

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lenis: Lenis | null = null;
let ctx: gsap.Context | null = null;

function tick(time: number) {
  lenis?.raf(time * 1000);
}

function initScroll() {
  if (reduceMotion()) return;
  lenis = new Lenis({ lerp: 0.1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
}

function destroyScroll() {
  gsap.ticker.remove(tick);
  lenis?.destroy();
  lenis = null;
}

/** [data-reveal] 요소: 화면에 들어올 때 아래에서 올라오며 나타남 */
function initReveals() {
  if (reduceMotion()) return;
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    gsap.from(el, {
      y: 40,
      autoAlpha: 0,
      duration: 0.9,
      ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });
}

/** 숫자 키 0~3 으로 페이지 이동 (입력창 포커스 중엔 무시) */
function onKey(e: KeyboardEvent) {
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  const t = e.target as HTMLElement;
  if (t.closest('input, textarea, [contenteditable]')) return;
  const route = ROUTES[Number(e.key)];
  if (route) {
    import('astro:transitions/client').then(({ navigate }) => navigate(url(route.path)));
  }
}

document.addEventListener('keydown', onKey);

document.addEventListener('astro:page-load', () => {
  initScroll();
  ctx = gsap.context(() => {
    initReveals();
    // 페이지 전용 모션 훅: 각 페이지 스크립트가 이 이벤트를 듣고 자기 애니메이션을 등록
    document.dispatchEvent(new CustomEvent('motion:ready', { detail: { gsap, ScrollTrigger, lenis } }));
  });
});

document.addEventListener('astro:before-swap', () => {
  ctx?.revert();
  ctx = null;
  ScrollTrigger.getAll().forEach((st) => st.kill());
  destroyScroll();
});

export { gsap, ScrollTrigger };
