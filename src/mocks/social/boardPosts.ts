export type BoardPost = {
  id: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
  author: string;
  authorMeta: string;
  timeAgo: string;
  viewCount: number;
};

export const MOCK_POSTS: BoardPost[] = [
  {
    id: '1',
    title: '컴공 저학년의 커리어 고민',
    content: `안녕하세요 이제 막 컴공 2학년이 된 학생입니다. \n백엔드와 프론트엔드 사이에서 어떤 직무를 해야할지 고민이 됩니다. 교내 동아리에서 web과 springboot로 각각 프로젝트 1개씩 해 본 결과 둘다 크게 나쁘지 않고 재밌었습니다. 그래서 더 고민이 되는 것 같습니다. 한 가지 직무를 정해 대외 활동이나 부캠을 통해 빨리 취업하고 싶습니다. 풀스택도 생각은 하지만 둘 중 어떤걸 우선적으로 심화시킬지 고민입니다. 비슷한 고민을 하셨던 분들 계실까요?`,
    likeCount: 80,
    commentCount: 40,
    author: '응애개발자',
    authorMeta: 'IT 신입 개발자 | BE Lv.3',
    timeAgo: '12시간 전',
    viewCount: 38,
  },
  {
    id: '2',
    title: '리액트 상태관리 뭐가 좋아요?',
    content: `zustand랑 recoil이랑 jotai 중에 뭘 써야 할지 고민이에요. \n 상태관리를 처음 도입하려고 하는데 어떻게 해야할지 모르겠어요. \n 프론트엔드 고수분들 도와주세요ㅜ\n 헬프미헬프미!!!!!!!!!`,
    likeCount: 25,
    commentCount: 7,
    author: '채채',
    authorMeta: '신입 프론트 개발자 | Lv.2',
    timeAgo: '3시간 전',
    viewCount: 112,
  },
  {
    id: '3',
    title: 'Spring Boot JPA N+1 해결법 정리',
    content: `N+1 문제를 fetch join으로 해결하는 방법을 정리해봤어요\n  N+1 문제는 보통 어쩌구저쩌구 샬라샬라 `,
    likeCount: 41,
    commentCount: 12,
    author: '나빅이',
    authorMeta: '마스터 프론트 개발자 | LV.10',
    timeAgo: '1일 전',
    viewCount: 59,
  },
  {
    id: '4',
    title: '백준 1103번',
    content: `이런 사고과정을 거쳤는데 어떻게 하면 풀이 과정을 단축할 수 있을까요? 도와주세요!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`,
    likeCount: 41,
    commentCount: 12,
    author: '컴공이',
    authorMeta: '마스터 프론트 개발자 | LV.10',
    timeAgo: '1일 전',
    viewCount: 59,
  },
];
