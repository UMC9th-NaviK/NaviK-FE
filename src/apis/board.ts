import axiosInstance from './axios';

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

export type DeleteBoardResponse = ApiResponse<{}>;

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
  isliked: boolean;
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

export type ApiResponse<T> = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
  timestamp: string;
};

export type GetBoardListResponse = ApiResponse<BoardListResult>;

export type GetBoardListParams = {
  cursor?: number | null;
  size?: number;
  sort?: string[];
  page?: number;
};

//전체 조회
export const getBoardList = (params?: GetBoardListParams) => {
  return axiosInstance.get<GetBoardListResponse>('/boards', { params });
};
//HOT 조회
export const getHotBoardList = (params?: GetBoardListParams) => {
  return axiosInstance.get('/boards/hot', { params });
};
//직무별 조회
export const getJobBoardList = (params?: GetBoardListParams & { jobName: string }) => {
  return axiosInstance.get('/boards/jobs', { params });
};
//게시글 검색
export const searchBoards = (params?: GetBoardListParams & { keyword: string }) => {
  return axiosInstance.get('/boards/search', { params });
};

//게시글 상세조회
export const getBoardDetail = (boardId: number) => {
  return axiosInstance.get(`/boards/${boardId}`);
};

//게시글 생성
export const createBoard = (body: CreateBoardReq) => {
  return axiosInstance.post<ApiResponse<number>>('/boards', body);
};

//게시글 좋아요 확인
export const toggleBoardLike = (boardId: number) => {
  return axiosInstance.post<ApiResponse<ToggleBoardLikeResult>>(`/boards/${boardId}/like`);
};

//게시글 수정
export const updateBoard = (boardId: number, body: UpdateBoardReq) => {
  return axiosInstance.put<ApiResponse<number>>(`/boards/${boardId}`, body);
};

//게시글 삭제
export const deleteBoard = (boardId: number) => {
  return axiosInstance.delete<DeleteBoardResponse>(`/boards/${boardId}`);
};

//전체 댓글 수 조회
export const getBoardCommentCount = (boardId: number) => {
  return axiosInstance.get<ApiResponse<GetBoardCommentCountResult>>(
    `/boards/${boardId}/comments/count`,
  );
};

//댓글 목록 조회
export const getBoardComments = (boardId: number, params?: GetBoardCommentsParams) => {
  return axiosInstance.get<ApiResponse<BoardCommentListResult>>(`/boards/${boardId}/comments`, {
    params,
  });
};

//댓글 작성
export const createBoardComment = (boardId: number, body: CreateCommentReq) => {
  return axiosInstance.post<ApiResponse<CreateCommentResult>>(`/boards/${boardId}/comments`, body);
};

//대댓글 작성
export const createBoardReply = (boardId: number, commentId: number, body: CreateCommentReq) => {
  return axiosInstance.post<ApiResponse<CreateCommentResult>>(
    `/boards/${boardId}/comments/${commentId}/reply`,
    body,
  );
};

//댓글 삭제(댓글/대댓글 공통)
export const deleteBoardComment = (boardId: number, commentId: number) => {
  return axiosInstance.delete<ApiResponse<{}>>(`/boards/${boardId}/comments/${commentId}`);
};
