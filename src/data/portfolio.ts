// 포트폴리오 목록. 이미지를 넣을 때는 src/assets/works/ 에 파일을 두고 image 에 import 하면 된다.
//   import work01 from '../assets/works/01.jpg';
//   { ..., image: work01 }
// image 가 없으면 color 로 칠한 박스가 대신 나온다.
// color 는 배경에 번지는 키컬러 — 이미지를 넣으면 자동으로 이미지 평균색을 쓴다.
import type { ImageMetadata } from 'astro';

export type WorkType = 'drawing' | 'photo' | 'film';

export type Work = {
  title: string;
  type: WorkType;
  year: number;
  ratio: string;           // 박스 비율 (이미지가 있으면 이미지 비율이 우선)
  color: string;           // 대체 색 / 키컬러
  image?: ImageMetadata;
  note?: string;
};

export const TYPES: { key: WorkType | 'all'; label: string; ko: string }[] = [
  { key: 'all', label: 'All', ko: '전체' },
  { key: 'drawing', label: 'Drawing', ko: '그림' },
  { key: 'photo', label: 'Photo', ko: '사진' },
  { key: 'film', label: 'Film still', ko: '영상' },
];

export const WORKS: Work[] = [
  { title: 'Untitled 01', type: 'drawing', year: 2026, ratio: '4/5',  color: '#c9553f' },
  { title: 'Seoul Night', type: 'photo',   year: 2026, ratio: '3/2',  color: '#2f4a6b' },
  { title: 'Scene 12',    type: 'film',    year: 2025, ratio: '16/9', color: '#5d6b4a' },
  { title: 'Portrait A',  type: 'photo',   year: 2025, ratio: '4/5',  color: '#b98f5c' },
  { title: 'Sketch Book', type: 'drawing', year: 2025, ratio: '1/1',  color: '#8b8f96' },
  { title: 'Scene 04',    type: 'film',    year: 2025, ratio: '21/9', color: '#3d3a52' },
  { title: 'Morning',     type: 'photo',   year: 2024, ratio: '2/3',  color: '#d3a64a' },
  { title: 'Figure',      type: 'drawing', year: 2024, ratio: '3/4',  color: '#7a3b3b' },
  { title: 'Scene 01',    type: 'film',    year: 2024, ratio: '16/9', color: '#4f6f72' },
];
