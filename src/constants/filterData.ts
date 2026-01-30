export interface FilterItem {
  id: string;
  label: string;
  items: string[];
}

export const FILTERS: FilterItem[] = [
  { id: 'job', label: '희망 직무', items: ['PM', '디자이너', '프론트엔드', '백엔드'] },
  { id: 'career', label: '경력 요건', items: ['신입', '경력'] },
  { id: 'type', label: '고용 형태', items: ['인턴', '정규직', '계약직', '프리랜서'] },
  {
    id: 'size',
    label: '회사 규모',
    items: ['대기업', '중견기업', '중소기업', '공기업', '외국계 기업'],
  },
  { id: 'edu', label: '학력', items: ['고등학교', '2년제 대학교', '4년제 대학교', '석사', '박사'] },
  {
    id: 'region',
    label: '근무 지역',
    items: [
      '서울',
      '부산',
      '대구',
      '인천',
      '광주',
      '대전',
      '울산',
      '세종',
      '경기',
      '강원',
      '충북',
      '충남',
      '전북',
      '전남',
      '경북',
      '경남',
      '제주',
      '해외',
    ],
  },
  {
    id: 'industry',
    label: '관심 산업',
    items: [
      '서비스업',
      '금융·은행업',
      'IT·정보통신업',
      '판매·유통업',
      '제조·생산·화학업',
      '교육업',
      '건설업',
      '의료·제약업',
      '미디어·광고업',
      '문화·예술·디자인업',
      '공공기관·협회',
    ],
  },
];
