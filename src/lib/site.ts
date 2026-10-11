// 사이트 전역 정보 + 페이지 목록. 네비게이션·단축키·푸터가 모두 여기서 읽는다.

export const SITE = {
  mark: '.01',
  name: 'Personal Enhancement System',
  tagline: 'Small steps / Real change / Always',
  year: 2026,
  version: '1.0',
};

export type Route = {
  key: 'home' | 'about' | 'portfolio' | 'milestone';
  no: string;
  label: string;
  ko: string;
  path: string;
  sub: string;
};

export const ROUTES: Route[] = [
  { key: 'home',      no: '00', label: 'Index',     ko: '랜딩',     path: '/',           sub: 'Track / Reflect / Build / Repeat' },
  { key: 'about',     no: '01', label: 'Core',      ko: '소개',     path: '/about',      sub: 'Values / Habits / Mindset' },
  { key: 'portfolio', no: '02', label: 'Portfolio', ko: '포트폴리오', path: '/portfolio',  sub: 'Work / Ideas / Growth' },
  { key: 'milestone', no: '03', label: 'Milestone', ko: '마일스톤',  path: '/milestone',  sub: 'Goals / Progress / Next' },
];

/** base 경로(GitHub Pages 하위 경로 배포)를 붙인 링크 */
export function url(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path}` || '/';
}
