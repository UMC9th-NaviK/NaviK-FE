import { type CategoryId } from './category';

export interface JobSummaryContent {
  job: string;
  title: string;
  body: string;
}

export const JOB_SUMMARY: Record<CategoryId, JobSummaryContent> = {
  pm: {
    job: 'PM',
    title: 'PM은 문제를 정의하고, 팀이 같은 방향으로 움직이게 만드는 역할입니다.',
    body: '사용자와 비즈니스의 요구를 구조화해 해결해야 할 문제를 명확히 하고, 데이터와 맥락을 바탕으로 무엇을 만들고 왜 만들어야 하는지를 결정합니다. 기획서 작성에 그치지 않고, 디자인·개발과의 협업 속에서 의사결정이 실제 제품으로 이어지도록 책임집니다.',
  },
  de: {
    job: 'PRODUCT DESIGNER',
    title: '프로덕트 디자이너는 사용자의 문제를 경험 관점에서 해결하는 역할입니다.',
    body: '요구사항을 그대로 그리는 것이 아니라, 사용자의 행동과 맥락을 이해해 가장 적절한 흐름과 화면을 설계합니다. UX 구조부터 UI 비주얼, 인터랙션까지 연결해 사용자가 자연스럽게 목표에 도달하도록 경험을 만듭니다.',
  },
  fe: {
    job: 'FRONTEND DEVELOPER',
    title: '프론트엔드 개발자는 사용자가 직접 마주하는 경험을 구현하는 역할입니다.',
    body: '디자인과 기획을 코드로 옮겨 실제 화면과 인터랙션을 만들고, 다양한 디바이스와 환경에서도 일관된 사용성을 제공합니다. 성능과 접근성을 고려해 사용 흐름을 개선하며, API 연동과 상태 관리를 통해 서비스 경험을 완성합니다.',
  },
  be: {
    job: 'BACKEND DEVELOPER',
    title: '백엔드 개발자는 서비스가 안정적으로 동작하도록 구조를 설계하는 역할입니다.',
    body: 'API와 데이터베이스를 설계하고, 비즈니스 로직을 코드로 구현해 사용자 요청이 정확하고 빠르게 처리되도록 만듭니다. 확장성과 보안을 고려한 아키텍처를 구성하고, 배포·운영 환경까지 포함해 서비스의 기반을 책임집니다.',
  },
};

export const JOB_KPIS: Record<CategoryId, string[]> = {
  pm: [
    '문제 정의·가설 수립',
    '데이터 기반 의사결정',
    '서비스 구조·핵심 플로우 결정',
    '요구사항 정의·정책 설계',
    '실험·검증 기반 의사결정',
    '우선순위·스코프 관리',
    '실행력·오너십',
    '의사결정 정렬·협업 조율',
    'AI/LLM 활용 기획',
    '사용자 리서치·공감',
  ],
  de: [
    'UX 전략·문제 재정의',
    '정보 구조·사용자 플로우 설계',
    'UI 시각 디자인·비주얼 완성도',
    '프로토타이핑·인터랙션 구현',
    '디자인 시스템 구축·운영',
    '데이터 기반 UX 개선',
    'AI 디자인 활용 능력',
    '멀티 플랫폼(OS·Web·App) 이해',
    '협업·커뮤니케이션 역량',
    'BX·BI 브랜드 경험 설계',
  ],
  fe: [
    '웹 기본기',
    '프레임워크 숙련도',
    '상태관리·컴포넌트 아키텍처',
    '웹 성능 최적화',
    'API 연동·비동기 처리',
    '반응형·크로스 브라우징 대응',
    '테스트 코드·품질 관리',
    'Git·PR·협업 프로세스 이해',
    '사용자 중심 UI 개발',
    '빌드·도구 환경 이해',
  ],
  be: [
    '주력 언어·프레임워크 숙련도',
    'REST API 설계·구현',
    'DB·데이터 모델링',
    '아키텍처 설계',
    '클라우드·DevOps 환경 이해',
    '성능·트래픽 처리 최적화',
    '보안·인증·권한 처리',
    '테스트·코드 품질 관리',
    '협업·문서화·의사결정 기록',
    '운영·모니터링·장애 대응',
  ],
};

export const getJobSummary = (categoryId: string): JobSummaryContent | undefined => {
  return JOB_SUMMARY[categoryId as CategoryId];
};

export const getJobKpis = (categoryId: string): string[] | undefined => {
  return JOB_KPIS[categoryId as CategoryId];
};
