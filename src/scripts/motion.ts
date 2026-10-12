// 전역 모션 런타임 — 모든 페이지에서 한 번 로드된다.
// ClientRouter 가 페이지를 바꿀 때마다 page-load 에서 초기화, before-swap 에서 정리한다.
//
// 페이지 전용 모션은 이렇게 등록한다:
//   document.addEventListener('motion:ready', (e) => {
//     const { gsap, cleanup } = (e as MotionEvent).detail;
//     if (!document.querySelector('[data-page="x"]')) return;
//     ...gsap 호출(자동 정리)... / cleanup(() => 직접 정리할 것)
//   });
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { ROUTES, url } from '../lib/site';

gsap.registerPlugin(ScrollTrigger);

export type MotionDetail = {
  gsap: typeof gsap;
  ScrollTrigger: typeof ScrollTrigger;
  lenis: Lenis | null;
  reduced: boolean;
  cleanup: (fn: () => void) => void;
};
export type MotionEvent = CustomEvent<MotionDetail>;

const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');

let lenis: Lenis | null = null;
let ctx: gsap.Context | null = null;
let cleanups: (() => void)[] = [];

function tick(time: number) {
  lenis?.raf(time * 1000);
}

function initScroll() {
  if (mqReduce.matches) return;
  lenis = new Lenis({ lerp: 0.11 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
}

function destroyScroll() {
  gsap.ticker.remove(tick);
  lenis?.destroy();
  lenis = null;
}

/** [data-reveal]: 화면에 들어올 때 아래에서 올라오며 나타남 */
function initReveals() {
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    gsap.from(el, {
      y: 40,
      autoAlpha: 0,
      duration: 0.9,
      ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
  });
}

/** svg[data-draw]: 손으로 그리듯 선이 그려짐 */
function initDraw() {
  gsap.utils.toArray<SVGSVGElement>('svg[data-draw]').forEach((svg) => {
    const paths = svg.querySelectorAll('path');
    gsap.set(paths, { strokeDasharray: 1, strokeDashoffset: 1 });
    gsap.to(paths, {
      strokeDashoffset: 0,
      duration: 0.7,
      ease: 'power2.inOut',
      stagger: 0.15,
      delay: Number(svg.dataset.drawDelay ?? 0),
      scrollTrigger: { trigger: svg, start: 'top 92%', once: true },
    });
  });
}

/** 숫자 키 0~3 으로 페이지 이동 (입력창 포커스 중엔 무시) */
function onKey(e: KeyboardEvent) {
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  const t = e.target as HTMLElement;
  if (t.closest('input, textarea, select, [contenteditable], dialog[open]')) return;
  const route = ROUTES[Number(e.key)];
  if (route && document.body.dataset.route !== route.key) {
    import('astro:transitions/client').then(({ navigate }) => navigate(url(route.path)));
  }
}

document.addEventListener('keydown', onKey);

// 동작 줄이기: 손그림 선은 남기되 떨림(seed 애니메이션)은 멈춘다
const pauseBoil = () => {
  const fx = document.getElementById('fx') as unknown as SVGSVGElement | null;
  if (!fx) return;
  if (mqReduce.matches) fx.pauseAnimations(); else fx.unpauseAnimations();
};
document.addEventListener('astro:page-load', pauseBoil);
mqReduce.addEventListener('change', pauseBoil);

document.addEventListener('astro:page-load', () => {
  initScroll();
  const reduced = mqReduce.matches;
  ctx = gsap.context(() => {
    if (!reduced) {
      initReveals();
      initDraw();
    }
    const detail: MotionDetail = {
      gsap,
      ScrollTrigger,
      lenis,
      reduced,
      cleanup: (fn) => cleanups.push(fn),
    };
    document.dispatchEvent(new CustomEvent('motion:ready', { detail }));
  });
  ScrollTrigger.refresh();
});

document.addEventListener('astro:before-swap', () => {
  cleanups.forEach((fn) => fn());
  cleanups = [];
  ctx?.revert();
  ctx = null;
  ScrollTrigger.getAll().forEach((st) => st.kill());
  destroyScroll();
});

export { gsap, ScrollTrigger };
