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

export type JobType = 'pm' | 'de' | 'fe' | 'be';

export type ResponseUserProfile = {
  id: number;
  profileImageUrl: string;
  nickname: string;
  job: string;
  isEntryLevel: boolean;
};
