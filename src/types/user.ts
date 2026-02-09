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
