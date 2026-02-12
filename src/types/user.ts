export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
  timestamp: string;
}

export interface UserProfile {
  id: number;
  profileImageUrl: string;
  nickname: string;
  job: string;
  isEntryLevel: boolean;
  educationLevel?: string; // 추가됨
  departmentList?: string[]; // 추가됨
}

export type RequestBasicInfo = {
  name: string;
  nickname?: string;
  jobId: number;
  isEntryLevel: boolean;
};

export type ResponseBasicInfo = {
  id: number;
  name: string;
  nickname?: string;
  jobId: number;
  isEntryLevel: boolean;
};

// 수정용 요청 타입
export interface UpdateProfileRequest {
  nickname: string;
  isEntryLevel: boolean;
  educationLevel: string;
  departmentIds: string[];
}

export type JobType = 'pm' | 'de' | 'fe' | 'be';

export type ResponseUserProfile = {
  id: number;
  profileImageUrl: string;
  nickname: string;
  job: string;
  isEntryLevel: boolean;
};

export type ResponseUserInfo = {
  id: number;
  profileImageUrl: string;
  name: string;
  nickname: string;
  job: string;
  isEntryLevel: boolean;
  educationLevel: 'HIGH_SCHOOL' | 'ASSOCIATE' | 'BACHELOR' | 'MASTER' | 'DOCTOR';
  departmentList: string[];
};
