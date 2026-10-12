// 포트폴리오 목록. 그림을 추가하려면:
//   1) src/assets/works/ 에 파일을 넣고
//   2) 아래에 import 한 뒤 WORKS 에 한 줄 추가.
// 화면에는 정사각형으로 잘려 보인다. 어느 쪽을 살릴지는 focus(CSS object-position)로 정한다.
// 키컬러(배경에 번지는 색)는 이미지 평균색으로 자동 계산된다.
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
  desc: string;            // 그림 아래 짧은 설명 (한두 문장)
  year?: number;
  image?: ImageMetadata;
  focus?: string;          // 정사각형 크롭 기준: 'center' | 'top' | 'bottom' | '30% 20%' …
  color?: string;          // 이미지가 없을 때의 대체 색
};

export const TYPES: { key: WorkType | 'all'; label: string; ko: string }[] = [
  { key: 'all', label: 'All', ko: '전체' },
  { key: 'drawing', label: 'Drawing', ko: '그림' },
  { key: 'animation', label: 'Animation', ko: '애니메이션' },
  { key: 'photo', label: 'Photo', ko: '사진' },
];

// desc 는 그림에 보이는 것을 바탕으로 적어둔 임시 문장 — 직접 고쳐 쓸 것
export const WORKS: Work[] = [
  { title: 'Love', type: 'drawing', image: love,
    desc: '서로 기댄 두 얼굴 위로 LOVE 가 겹쳐 지나간다. 수채 번짐과 잉크선.' },
  { title: 'Hellow', type: 'drawing', image: hellow, focus: 'top',
    desc: '화면을 향해 활짝 편 손바닥. 인사는 가장 짧은 자기소개.' },
  { title: 'Made in Seoul', type: 'animation', image: madeInSeoul, focus: 'top',
    desc: '주근깨 얼굴 위에 큰 글자로 찍은 출신지.' },
  { title: 'This Christmas', type: 'animation', image: thisChristmas, focus: 'top',
    desc: '털모자를 쓴 아이가 밤하늘의 불빛을 올려다본다.' },
  { title: 'Hi', type: 'animation', image: hi, focus: 'top',
    desc: '심드렁한 얼굴로 건네는 인사.' },
  { title: 'What????', type: 'animation', image: what,
    desc: '노란 화면과 분홍 바탕, 물음표 네 개.' },
  { title: 'Boom', type: 'animation', image: boom,
    desc: '연기와 함께 터지는 빨간 글자.' },
  { title: 'Umbrella', type: 'animation', image: umbrella,
    desc: '우산 안쪽에서 올려다본 비 오는 하늘.' },
  { title: 'Pressure', type: 'animation', image: pressure,
    desc: '흐린 하늘 아래 무겁게 놓인 한 단어.' },
  { title: 'What do you have to deal with', type: 'animation', image: dealWith, focus: 'top',
    desc: '삶에서 견뎌야 하는 것에 대한 질문.' },
  { title: 'I just need', type: 'animation', image: iJustNeed, focus: 'bottom',
    desc: '어둠 속에 번지는 불빛과 말이 되지 못한 문장.' },
];
