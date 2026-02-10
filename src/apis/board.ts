import axiosInstance from './axios';
import type {
  ApiResponse,
  BoardListResult,
  BoardCommentListResult,
  CreateBoardReq,
  CreateCommentReq,
  CreateCommentResult,
  DeleteBoardResponse,
  GetBoardCommentCountResult,
  GetBoardCommentsParams,
  GetBoardListParams,
  ToggleBoardLikeResult,
  UpdateBoardReq,
  BoardDetail,
} from '../types/social/board/board';

//전체 조회
export const getBoardList = (params?: GetBoardListParams) => {
  return axiosInstance.get<ApiResponse<BoardListResult>>('/boards', { params });
};
//HOT 조회
export const getHotBoardList = (params?: GetBoardListParams) => {
  return axiosInstance.get<ApiResponse<BoardListResult>>('/boards/hot', { params });
};
//직무별 조회
export const getJobBoardList = (params?: GetBoardListParams & { jobName: string }) => {
  return axiosInstance.get<ApiResponse<BoardListResult>>('/boards/jobs', { params });
};
//게시글 검색
export const searchBoards = (params?: GetBoardListParams & { keyword: string }) => {
  return axiosInstance.get<ApiResponse<BoardListResult>>('/boards/search', { params });
};

//게시글 상세조회
export const getBoardDetail = (boardId: number) => {
  return axiosInstance.get<ApiResponse<BoardDetail>>(`/boards/${boardId}`);
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
