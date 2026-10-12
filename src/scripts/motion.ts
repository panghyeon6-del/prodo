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
const mqFine = window.matchMedia('(hover: hover) and (pointer: fine)');

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

/* ── 커스텀 커서 ─────────────────────────────── */
const cursor = { x: -100, y: -100, tx: -100, ty: -100 };
let cursorEl: HTMLElement | null = null;
let cursorLabel: HTMLElement | null = null;

function onPointerMove(e: PointerEvent) {
  if (e.pointerType !== 'mouse') return;
  cursor.tx = e.clientX;
  cursor.ty = e.clientY;
  if (!document.documentElement.classList.contains('has-cursor')) {
    cursor.x = e.clientX;
    cursor.y = e.clientY;
    document.documentElement.classList.add('has-cursor');
  }
  const target = e.target as Element;
  const hot = target.closest<HTMLElement>('a, button, [data-cursor]');
  cursorEl?.classList.toggle('is-link', !!hot);
  cursorEl?.classList.toggle('on-dark', !!target.closest('[data-dark]'));
  if (cursorLabel) cursorLabel.textContent = hot?.dataset.cursorLabel ?? '';
}

function cursorTick() {
  if (!cursorEl) return;
  cursor.x += (cursor.tx - cursor.x) * 0.35;
  cursor.y += (cursor.ty - cursor.y) * 0.35;
  cursorEl.style.transform = `translate3d(${cursor.x}px, ${cursor.y}px, 0)`;
}

function initCursor() {
  cursorEl = document.querySelector('.cursor');
  cursorLabel = document.querySelector('.cursor-label');
  if (!mqFine.matches || !cursorEl) return;
  window.addEventListener('pointermove', onPointerMove, { passive: true });
  window.addEventListener('pointerdown', () => cursorEl?.classList.add('is-down'));
  window.addEventListener('pointerup', () => cursorEl?.classList.remove('is-down'));
  document.documentElement.addEventListener('pointerleave', () =>
    document.documentElement.classList.remove('has-cursor'),
  );
  gsap.ticker.add(cursorTick);
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
initCursor();

// 동작 줄이기: 손그림 선은 남기되 떨림(seed 애니메이션)은 멈춘다
const pauseBoil = () => {
  const fx = document.getElementById('fx') as unknown as SVGSVGElement | null;
  if (!fx) return;
  if (mqReduce.matches) fx.pauseAnimations(); else fx.unpauseAnimations();
};
document.addEventListener('astro:page-load', pauseBoil);
mqReduce.addEventListener('change', pauseBoil);

document.addEventListener('astro:page-load', () => {
  // 페이지 이동 시 html 클래스가 교체되므로 커서 표시 상태를 복구
  if (mqFine.matches && cursor.tx > 0) document.documentElement.classList.add('has-cursor');
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
