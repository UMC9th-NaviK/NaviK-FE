export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
  timestamp: string;
}

// 유저 프로필 (마이페이지)
export interface UserProfile {
  id: number;
  profileImageUrl: string;
  nickname: string;
  job: string;
  isEntryLevel: boolean;
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

export interface UserProfile {
  educationLevel: string; // 'BACHELOR'
  departmentList: string[]; // ['1', '2'] 등으로 옴
}

// 수정용 요청 타입
export interface UpdateProfileRequest {
  nickname: string;
  isEntryLevel: boolean;
  educationLevel: string;
  departmentIds: string[]; // 조회할 땐 departmentList였지만 보낼 땐 Id로!!!!!
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
  educationLevel: 'HIGH_SCHOOL' | 'ASSOCIATE' | 'BACHELOR' | 'MASTER' | 'DOCTORATE';
  departmentList: string[];
};
