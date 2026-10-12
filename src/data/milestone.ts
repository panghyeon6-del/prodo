// 현재 마일스톤 하나만. 끝나면 이 파일 내용을 다음 목표로 바꾸면 된다.
// 날짜는 YYYY-MM-DD. 현재 위치(NOW)는 방문자의 오늘 날짜로 계산된다.

export type Phase = {
  name: string;
  start: string;
  end: string;
  tasks: { text: string; done: boolean }[];
};

export const MILESTONE = {
  no: '/01',
  title: 'A Sharper You',
  summary: '포트폴리오 사이트를 열고, 작업 아카이브를 정리하고, 첫 시리즈를 공개한다.',
  start: '2026-09-01',
  end: '2026-12-31',
  phases: [
    {
      name: 'Plan',
      start: '2026-09-01',
      end: '2026-09-21',
      tasks: [
        { text: '목표와 범위 정하기', done: true },
        { text: '레퍼런스 수집', done: true },
      ],
    },
    {
      name: 'Build',
      start: '2026-09-22',
      end: '2026-10-31',
      tasks: [
        { text: '사이트 디자인 시스템', done: true },
        { text: '페이지 4개 제작', done: false },
        { text: '작업물 사진 촬영', done: false },
      ],
    },
    {
      name: 'Archive',
      start: '2026-11-01',
      end: '2026-11-30',
      tasks: [
        { text: '포트폴리오 이미지 정리', done: false },
        { text: '작업 설명 쓰기', done: false },
      ],
    },
    {
      name: 'Launch',
      start: '2026-12-01',
      end: '2026-12-31',
      tasks: [
        { text: '도메인 연결 · 공개', done: false },
        { text: '첫 시리즈 발행', done: false },
      ],
    },
  ] satisfies Phase[],
};
