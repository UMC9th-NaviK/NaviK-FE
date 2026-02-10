export type BoardPost = {
  id: number;
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
    id: 1,
    title: '첫 번째 게시글',
    content: '내용 예시입니다.',
    likeCount: 12,
    commentCount: 3,
    author: '민채원',
    authorMeta: '프론트엔드 · Lv.3',
    timeAgo: '방금 전',
    viewCount: 120,
  },
  {
    id: 2,
    title: '두 번째 게시글',
    content: '내용 예시입니다.',
    likeCount: 5,
    commentCount: 1,
    author: '작성자',
    authorMeta: 'PM · Lv.2',
    timeAgo: '10분 전',
    viewCount: 44,
  },
  {
    id: 3,
    title: '세 번째 게시글',
    content: '내용 예시입니다.',
    likeCount: 30,
    commentCount: 10,
    author: '작성자',
    authorMeta: '디자이너 · Lv.4',
    timeAgo: '1시간 전',
    viewCount: 300,
  },
  {
    id: 4,
    title: '네 번째 게시글',
    content: '내용 예시입니다.',
    likeCount: 2,
    commentCount: 0,
    author: '작성자',
    authorMeta: '백엔드 · Lv.1',
    timeAgo: '2시간 전',
    viewCount: 18,
  },
  {
    id: 5,
    title: '다섯 번째 게시글',
    content: '내용 예시입니다.',
    likeCount: 9,
    commentCount: 4,
    author: '작성자',
    authorMeta: 'PM · Lv.2',
    timeAgo: '어제',
    viewCount: 90,
  },
];
