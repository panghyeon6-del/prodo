// 포트폴리오 목록. 그림을 추가하려면:
//   1) src/assets/works/ 에 파일을 넣고 (긴 변 2400px 정도면 충분)
//   2) WORKS 에 한 줄 추가 — image 는 파일 이름(확장자 제외)
// 화면에는 정사각형으로 잘려 보인다. 어느 쪽을 살릴지는 focus(CSS object-position)로 정한다.
import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/works/*.jpg', { eager: true });
const img = (name: string) => {
  const f = files[`../assets/works/${name}.jpg`];
  if (!f) throw new Error(`작품 이미지가 없습니다: src/assets/works/${name}.jpg`);
  return f.default;
};

export type WorkType = 'concept' | 'character' | 'illustration' | 'poster';

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
  { key: 'concept', label: 'Concept', ko: '콘셉트 아트' },
  { key: 'character', label: 'Character', ko: '캐릭터' },
  { key: 'illustration', label: 'Illustration', ko: '일러스트' },
  { key: 'poster', label: 'Poster', ko: '포스터' },
];

// 제목·설명은 그림에 보이는 것을 바탕으로 적어둔 임시 문장 — 직접 고쳐 쓸 것
const w = (name: string, title: string, type: WorkType, desc: string, focus?: string): Work =>
  ({ title, type, desc, image: img(name), focus });

export const WORKS: Work[] = [
  w('eye-street', 'Eye on the Street', 'concept', '버려진 도시의 길 끝, 떠 있는 거대한 눈과 마주 선 사람.'),
  w('camping-in-the-dark', 'Camping in the Dark', 'poster', '어두운 숲, 모닥불 하나와 도끼를 든 사람.', 'bottom'),
  w('flare', 'Flare', 'character', '장바구니와 신호탄을 든 생존자.', 'top'),
  w('yellow-pod', 'Yellow Pod', 'concept', '분홍 풀밭에 박힌 노란 구체와 그 앞의 탐사자.', '70% center'),
  w('fog-station', 'Fog Station', 'concept', '안개 속 캠핑카, 하늘을 가로지르는 붉은 선.'),
  w('sky-squid', 'Sky Squid', 'concept', '별 아래 폐허 도시 위를 헤엄치는 붉은 생물.', '30% center'),
  w('surv', 'SURV', 'concept', '안개 낀 숲, 모닥불 곁의 세 사람.'),
  w('masked-thin', 'Masked — Thin', 'character', '가면을 쓰고 벗는 인물의 세 단계.'),
  w('horned', 'Horned', 'character', '푸른 어둠에서 걸어 나오는 뿔 달린 거인.', 'top'),
  w('masked-heavy', 'Masked — Heavy', 'character', '가면을 쓰고 벗는 인물의 세 단계.'),
  w('love', 'Love', 'illustration', '서로 기댄 두 얼굴 위로 LOVE 가 겹쳐 지나간다.'),
  w('holiday-of-hero', 'Holiday of Hero', 'illustration', '이어폰을 꽂은 영웅의 쉬는 날.', 'top'),
  w('corridor-12', 'Corridor 12', 'concept', '불길 너머의 무언가를 지켜보는 두 사람.'),
  w('violet-raid', 'Violet Raid', 'concept', '보랏빛 연기 속 전투.'),
  w('red-hound', 'Red Hound', 'concept', '붉은 폭발과 검은 짐승.'),
  w('self-portrait', 'Self Portrait', 'illustration', '펜을 든 자화상.', 'top'),
  w('bob', 'Bob', 'illustration', '흑백 인물 스케치.'),
  w('rain-field', 'Rain Field', 'concept', '빗속 들판에 쓰러진 기계와 빛나는 나무.'),
  w('tentacle-shore', 'Tentacle Shore', 'concept', '해변에 박힌 거대한 촉수와 그 아래의 피크닉.', '65% center'),
  w('freelancer-type', 'Freelancer — Type', 'poster', '글리치로 깨진 FREELANCER.'),
  w('freelancer', 'Freelancer', 'poster', '우주 탐사사의 미래. Pack it light.', 'top'),
  w('seolmundae-halmang', '설문대할망', 'concept', '바다에서 걸어 나오는 거인과 작은 탐사대.'),
  w('lack-of-love-yes', 'Lack of Love — Yes', 'poster', '붉은 줄무늬 뒤의 얼굴.', 'top'),
  w('lack-of-love-no', 'Lack of Love — No', 'poster', 'I really need someone who need me.', 'top'),
  w('hellow', 'Hellow', 'illustration', '화면을 향해 활짝 편 손바닥.', 'top'),
];
