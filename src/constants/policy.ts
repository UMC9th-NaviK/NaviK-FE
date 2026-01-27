export interface Policy {
  id: string;
  title: string;
  required: boolean;
}

export interface PolicyContent {
  title: string;
  content: {
    subtitle?: string;
    text: string;
  }[];
}

export const POLICIES: Policy[] = [
  {
    id: 'serviceTerms',
    title: '서비스 이용약관',
    required: true,
  },
  {
    id: 'serviceRestriction',
    title: '서비스 이용 제한 및 책임 규정',
    required: true,
  },
  {
    id: 'contentPolicy',
    title: '스터디·콘텐츠 이용 정책',
    required: true,
  },
  {
    id: 'privacyPolicy',
    title: '개인정보 처리 방침',
    required: true,
  },
];

// 약관 상세 내용
export const POLICY_CONTENT: Record<string, PolicyContent> = {
  serviceTerms: {
    title: '서비스 이용약관',
    content: [
      {
        subtitle: '제1조 (목적)',
        text: '내용',
      },
      {
        subtitle: '제2조 (정의)',
        text: '내용',
      },
    ],
  },

  serviceRestriction: {
    title: '서비스 이용 제한 및 책임 규정',
    content: [
      {
        subtitle: '제1조 (목적)',
        text: '',
      },
    ],
  },

  contentPolicy: {
    title: '스터디·콘텐츠 이용 정책',
    content: [
      {
        subtitle: '제1조 (목적)',
        text: '',
      },
    ],
  },

  privacyPolicy: {
    title: '개인정보 처리 방침',
    content: [
      {
        subtitle: '제1조 (목적)',
        text: '',
      },
    ],
  },
};

export type PolicyId = keyof typeof POLICY_CONTENT;

export const getPolicyContent = (id: PolicyId): PolicyContent | undefined => {
  return POLICY_CONTENT[id];
};
