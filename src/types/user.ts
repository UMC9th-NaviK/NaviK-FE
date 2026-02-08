export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
  timestamp: string;
}

// 유저 프로필 (마이페이지)
export interface UserProfile {
  profileImageUrl: string;
  nickname: string;
  job: string;
  isEntryLevel: boolean;
}
