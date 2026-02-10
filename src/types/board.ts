export type ApiResponse<T> = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
  timestamp: string;
};

// Board

export type UpdateBoardReq = {
  articleTitle: string;
  articleContent: string;
};

export type CreateBoardReq = {
  articleTitle: string;
  articleContent: string;
};

export type ToggleBoardLikeResult = {
  boardId: number;
  likeCount: number;
  isLiked: boolean;
};

export type BoardDetail = {
  boardId: number;
  userId: number;
  jobName: string;
  nickname: string;
  profileImageUrl: string;
  level: number;
  isEntryLevel: boolean;
  articleTitle: string;
  articleContent: string;
  likeCount: number;
  isLiked?: boolean;
  isliked?: boolean;
  commentCount: number;
  viewCount: number;
  createdAt: string;
};

export type BoardListItem = {
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
  createdAt: string;
};

export type BoardListResult = {
  content: BoardListItem[];
  pageSize: number;
  nextCursor: number | null;
  hasNext: boolean;
};

export type GetBoardListResponse = ApiResponse<BoardListResult>;

export type GetBoardListParams = {
  cursor?: number | null;
  size?: number;
  sort?: string[];
  page?: number;
};

export type DeleteBoardResponse = ApiResponse<{}>;

// Comment

export type CreateCommentReq = { content: string };

export type CreateCommentResult = {
  commentId: number;
  profileImageUrl: string;
  level: number;
  nickname: string;
  isEntryLevel: boolean;
};

export type BoardCommentItem = {
  boardId: number;
  commentId: number;
  userId: number;
  parentCommentId: number;
  content: string;
  nickname: string;
  profileImageUrl: string;
  level: number;
  isMyComment: boolean;
  isEntryLevel: boolean;
  jobName: string;
  createdAt: string;
};

export type BoardCommentListResult = {
  content: BoardCommentItem[];
  pageSize: number;
  nextCursor: string | null;
  hasNext: boolean;
};

export type GetBoardCommentsParams = {
  page?: number;
  size?: number;
  sort?: string[];
  cursor?: string | null;
};

export type GetBoardCommentCountResult = {
  totalCommentCount: number;
};
