// mockJobData.ts
export interface JobData {
  id: number;
  company: string;
  title: string;
  mainJob: string;
  kpis: string[];
  tags: string[];
  dDay: string;
  deadline: string;
  isApplicable: boolean;
}

export const MOCK_JOBS: JobData[] = [
  {
    id: 1,
    company: '토스뱅크',
    title: 'AI 데이터셋 기획자(인턴)',
    mainJob: 'IT 기획',
    kpis: ['AI, 자동화 기반 업무환경 설계', '기술 트렌드 모니터링'],
    tags: ['스타트업', '인턴'],
    dDay: 'D-5',
    deadline: '2026년 1월 17일 18:00',
    isApplicable: true,
  },
  {
    id: 2,
    company: '카카오페이',
    title: '프론트엔드 개발자(체험형)',
    mainJob: 'FE 개발',
    kpis: ['React 기반 서비스 고도화', '디자인 시스템 유지보수'],
    tags: ['대기업', '인턴'],
    dDay: 'D-3',
    deadline: '2026년 1월 20일 18:00',
    isApplicable: false,
  },
  {
    id: 3,
    company: '네이버파이낸셜',
    title: '백엔드 엔지니어(Java/Spring)',
    mainJob: 'BE 개발',
    kpis: ['대용량 트래픽 처리 시스템 설계', 'API 성능 최적화'],
    tags: ['대기업', '정규직'],
    dDay: 'D-7',
    deadline: '2026년 2월 04일 17:00',
    isApplicable: true,
  },
  {
    id: 4,
    company: '당근',
    title: '프로덕트 디자이너(인턴)',
    mainJob: 'UI/UX 디자인',
    kpis: ['사용자 중심 UI 고도화', '디자인 시스템 확장'],
    tags: ['유니콘', '인턴'],
    dDay: 'D-2',
    deadline: '2026년 1월 30일 23:59',
    isApplicable: true,
  },
  {
    id: 5,
    company: '무신사',
    title: '데이터 분석가(신입)',
    mainJob: '데이터 분석',
    kpis: ['이커머스 구매 데이터 모델링', 'A/B 테스트 설계'],
    tags: ['스타트업', '신입'],
    dDay: 'D-10',
    deadline: '2026년 2월 07일 18:00',
    isApplicable: false,
  },
  {
    id: 6,
    company: '라인플러스',
    title: 'iOS 개발자(경력)',
    mainJob: '모바일 앱 개발',
    kpis: ['Swift 기반 글로벌 서비스 개발', 'CI/CD 자동화 구축'],
    tags: ['글로벌', '경력'],
    dDay: 'D-1',
    deadline: '2026년 1월 29일 10:00',
    isApplicable: true,
  },
  {
    id: 7,
    company: '우아한형제들',
    title: '웹 퍼블리셔(신입)',
    mainJob: 'FE 개발',
    kpis: ['웹 표준 및 접근성 가이드 준수', '반응형 웹 인터페이스 구현'],
    tags: ['대기업', '신입'],
    dDay: 'D-14',
    deadline: '2026년 2월 11일 18:00',
    isApplicable: true,
  },
  {
    id: 8,
    company: '쿠팡',
    title: 'QA 엔지니어(인턴)',
    mainJob: 'QA/테스트',
    kpis: ['자동화 테스트 스크립트 작성', '릴리즈 품질 관리'],
    tags: ['글로벌', '인턴'],
    dDay: 'D-5',
    deadline: '2026년 2월 02일 15:00',
    isApplicable: false,
  },
];
