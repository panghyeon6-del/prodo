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

// 연락처. 계정이 생기면 아래 주석을 풀어 한 줄씩 추가한다.
export const CONTACTS: { label: string; value: string; href: string; copy?: boolean }[] = [
  { label: 'Email', value: 'panghyeon6@gmail.com', href: 'mailto:panghyeon6@gmail.com', copy: true },
  // { label: 'Instagram', value: '@아이디', href: 'https://instagram.com/아이디' },
  // { label: 'YouTube', value: '@채널', href: 'https://youtube.com/@채널' },
];

// 랜딩 가운데 대표 비주얼.
//   mode 'image' — 자화상 그림 (src/assets/me.jpg)
//   mode '3d'    — 3D 모델. model 에 public/ 기준 경로(.glb 권장 / .fbx 가능). 비우면 빨간 상자 자리표시
// 주소 뒤에 ?3d 를 붙이면 설정과 상관없이 3D 로 미리볼 수 있다. ?3d=models/파일.fbx 처럼 파일도 지정 가능.
export const HERO: { mode: 'image' | '3d'; model: string } = {
  mode: 'image',
  model: '', // 예: 'models/frodo.glb'
};

export const NAV_ROUTES = ROUTES.filter((r) => r.key !== 'home');

export const getRoute = (key: Route['key']) => ROUTES.find((r) => r.key === key)!;

/** base 경로(GitHub Pages 하위 경로 배포)를 붙인 링크 */
export function url(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path}` || '/';
}
