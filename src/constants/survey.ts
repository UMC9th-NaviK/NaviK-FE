import { type CategoryId } from './category';

export interface SurveyQuestion {
  id: number;
  question: string;
}

export const SURVEY_OPTIONS = [
  { value: 1, label: '전혀 아니다' },
  { value: 2, label: '조금 아니다' },
  { value: 3, label: '보통' },
  { value: 4, label: '약간 그렇다' },
  { value: 5, label: '매우 그렇다' },
] as const;

export const SURVEY_QUESTIONS: Record<CategoryId, SurveyQuestion[]> = {
  pm: [
    {
      id: 1,
      question:
        '사용자 데이터와 맥락을 바탕으로 문제를 구조적으로 정의하고, 검증 가능한 해결 가설을 세워본 경험이 있다.',
    },
    {
      id: 2,
      question:
        '지표, 로그, 리서치 결과 등을 근거로 무엇을 먼저 해결할지 우선순위를 정해본 경험이 있다.',
    },
    {
      id: 3,
      question:
        '서비스가 가져야 할 기능 구조와 핵심 사용자 흐름(IA·Flow)을 정의하고 이후 디자인·개발의 기준점으로 사용해본 경험이 있다.',
    },
    {
      id: 4,
      question:
        '사용자·비즈니스 요구를 개발자가 바로 구현할 수 있는 수준의 정책·요구사항 문서로 정리해본 경험이 있다.',
    },
    {
      id: 5,
      question:
        '기능이나 정책을 바로 적용하기보다, 실험(A/B 테스트 등)을 통해 효과를 검증하고 유지·개선·중단을 판단해본 경험이 있다.',
    },
  ],
  de: [
    {
      id: 1,
      question:
        '주어진 요구사항을 그대로 받아들이기보다, 사용자 관점에서 문제를 다시 정의하고 디자인이 해결해야 할 핵심 경험을 정리해본 경험이 있다.',
    },
    {
      id: 2,
      question:
        '서비스의 기능과 정보를 정리할 때, PM이 정의한 방향을 바탕으로 정보 구조와 사용자 흐름을 시각적으로 정리·구체화해본 경험이 있다.',
    },
    {
      id: 3,
      question:
        '프로토타입(Figma·Protopie 등)을 통해 실제 사용에 가까운 인터랙션을 구현하고 디자인 의도를 검증해본 경험이 있다.',
    },
    {
      id: 4,
      question:
        '컴포넌트, 스타일, 가이드라인 등을 정리해 디자인의 일관성과 확장성을 유지하려고 노력해본 경험이 있다.',
    },
    {
      id: 5,
      question:
        '사용자 지표, 테스트 결과, 피드백 등을 바탕으로 디자인을 수정·개선해본 경험이 있다.',
    },
  ],
  fe: [
    {
      id: 1,
      question:
        '기능이 커지거나 요구사항이 변경될 것을 고려해, 컴포넌트를 역할별로 분리하고 상태를 구조적으로 설계해본 경험이 있다.',
    },
    {
      id: 2,
      question:
        'API 연동 시 로딩·에러·캐싱을 고려해 사용자 흐름이 끊기지 않도록 비동기 처리를 구성해본 경험이 있다.',
    },
    {
      id: 3,
      question:
        '로딩 속도나 인터랙션 지연 문제를 지표(Lighthouse 등)를 기준으로 분석하고 개선해본 경험이 있다. ',
    },
    {
      id: 4,
      question:
        '디자인 시안을 그대로 구현하는 것을 넘어, 실제 사용자 흐름과 사용성을 고려해 UI를 조정·개선해본 경험이 있다.',
    },
    {
      id: 5,
      question:
        '테스트, 린트, 타입 체크, 코드 리뷰 등을 통해 코드 품질을 유지하거나 개선하려고 노력해본 경험이 있다.',
    },
  ],
  be: [
    {
      id: 1,
      question:
        '장애나 이슈가 발생했을 때, 로그·지표를 기반으로 원인을 파악하고 해결에 참여해본 경험이 있다. ',
    },
    {
      id: 2,
      question:
        '새로운 기능을 만들 때, 요구사항을 분석하고 API/데이터 구조를 설계해본 경험이 있다.',
    },
    {
      id: 3,
      question:
        '서비스가 배포되고 운영되는 전체 흐름(AWS, CI/CD, 로그, 알람)을 이해하고 실제로 다뤄본 경험이 있다.',
    },
    {
      id: 4,
      question:
        '코드 리뷰, 테스트, 리팩토링 등을 통해 팀의 코드 품질을 개선하려고 노력해본 경험이 있다.',
    },
    {
      id: 5,
      question:
        '예상치 못한 문제(버그/성능/데이터 이슈)가 발생했을 때, 원인 가설을 세우고 실험/검증을 반복해본 경험이 있다.',
    },
  ],
};

export const getSurveyQuestions = (categoryId: string): SurveyQuestion[] => {
  return SURVEY_QUESTIONS[categoryId as CategoryId] || [];
};
