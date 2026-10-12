// 사이트 전역 정보 + 페이지 목록. 내비게이션·단축키·푸터가 모두 여기서 읽는다.

export const SITE = {
  name: 'Personal Enhancement System',
  tagline: 'Small steps / Real change / Always',
  year: 2026,
  version: '1.0',
};

export type Route = {
  key: 'home' | 'portfolio' | 'milestone';
  no: string;
  label: string;
  ko: string;
  path: string;
  sub: string;
};

// 홈 = 소개(About). 내비 타일에 나오지 않는다 — 왼쪽 빨간 네모가 홈 버튼.
export const ROUTES: Route[] = [
  { key: 'home',      no: '00', label: 'About',     ko: '소개',     path: '/',          sub: 'Better / Clearer / Further' },
  { key: 'portfolio', no: '01', label: 'Portfolio', ko: '포트폴리오', path: '/portfolio', sub: 'Drawing / Animation' },
  { key: 'milestone', no: '02', label: 'Milestone', ko: '마일스톤',  path: '/milestone', sub: 'Goals / Progress / Next' },
];

export const CONTACTS = [
  { label: 'Email', value: 'hello@example.com', href: 'mailto:hello@example.com', copy: true },
  { label: 'Instagram', value: '@username', href: 'https://instagram.com/' },
  { label: 'YouTube', value: '@channel', href: 'https://youtube.com/' },
];

export const NAV_ROUTES = ROUTES.filter((r) => r.key !== 'home');

export const getRoute = (key: Route['key']) => ROUTES.find((r) => r.key === key)!;

/** base 경로(GitHub Pages 하위 경로 배포)를 붙인 링크 */
export function url(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path}` || '/';
}
