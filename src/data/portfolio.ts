// 포트폴리오 목록. 그림을 추가하려면:
//   1) src/assets/works/ 에 파일을 넣고
//   2) 아래에 import 한 뒤 WORKS 에 한 줄 추가.
// 키컬러(배경에 번지는 색)는 이미지 평균색으로 자동 계산된다. color 는 이미지가 없을 때의 대체 색.
import type { ImageMetadata } from 'astro';
import love from '../assets/works/love.jpg';
import hellow from '../assets/works/hellow.jpg';
import madeInSeoul from '../assets/works/made-in-seoul.jpg';
import thisChristmas from '../assets/works/this-christmas.jpg';
import hi from '../assets/works/hi.jpg';
import what from '../assets/works/what.jpg';
import boom from '../assets/works/boom.jpg';
import umbrella from '../assets/works/umbrella.jpg';
import pressure from '../assets/works/pressure.jpg';
import dealWith from '../assets/works/deal-with.jpg';
import iJustNeed from '../assets/works/i-just-need.jpg';

export type WorkType = 'drawing' | 'animation' | 'photo';

export type Work = {
  title: string;
  type: WorkType;
  year?: number;
  image?: ImageMetadata;
  ratio?: string;          // 이미지가 없을 때만 사용
  color?: string;
  note?: string;
};

export const TYPES: { key: WorkType | 'all'; label: string; ko: string }[] = [
  { key: 'all', label: 'All', ko: '전체' },
  { key: 'drawing', label: 'Drawing', ko: '그림' },
  { key: 'animation', label: 'Animation', ko: '애니메이션' },
  { key: 'photo', label: 'Photo', ko: '사진' },
];

export const WORKS: Work[] = [
  { title: 'Love', type: 'drawing', image: love },
  { title: 'Hellow', type: 'drawing', image: hellow },
  { title: 'Made in Seoul', type: 'animation', image: madeInSeoul },
  { title: 'This Christmas', type: 'animation', image: thisChristmas },
  { title: 'Hi', type: 'animation', image: hi },
  { title: 'What????', type: 'animation', image: what },
  { title: 'Boom', type: 'animation', image: boom },
  { title: 'Umbrella', type: 'animation', image: umbrella },
  { title: 'Pressure', type: 'animation', image: pressure },
  { title: 'What do you have to deal with', type: 'animation', image: dealWith },
  { title: 'I just need', type: 'animation', image: iJustNeed },
];
