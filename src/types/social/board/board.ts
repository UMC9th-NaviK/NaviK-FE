export type BoardItem = {
  boardId: number;
  userId: number;
  jobName: string;
  nickname: string;
  profileImageUrl: string | null;
  level: number;
  isEntryLevel: boolean;
  articleTitle: string;
  articleContent: string;
  likeCount: number;
  commentCount: number;
  viewCount: number;
  createdAt: string; // ISO string
};

export type BoardsResult = {
  content: BoardItem[];
  pageSize: number;
  nextCursor: number | null; // 서버가 number로 주면 number, 지금 예시는 null
  hasNext: boolean;
};

export type ApiResponse<T> = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
  timestamp: string;
};

export type GetBoardsResponse = ApiResponse<BoardsResult>;
