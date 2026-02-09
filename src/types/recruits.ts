export interface Recruitment {
  id: number;
  postId: string;
  link: string;
  companyLogo: string;
  companyName: string;
  companySize: string;
  title: string;
  dday: number | null;

  // --- 새로 추가된 필드 (추천 포지션 전용) ---
  positionName?: string;
  endDate?: string;
  kpis?: string[];
  hashTags?: string[];
  satisfyExperience?: boolean;
  satisfyEducation?: boolean;
  satisfyMajor?: boolean;

  // --- 기존 필드 (기본 공고 전용 - Optional로 변경) ---
  workPlace?: string;
  experience?: string;
  employment?: string;
  aiSummary?: string;
  recommend?: boolean;
}

// 공통 페이징 응답 구조
export interface CursorPageResponse<T> {
  content: T[];
  nextCursor: string | null;
  hasNext: boolean;
}

// POST 요청 바디 타입
export interface RecruitPostFilterBody {
  jobTypes?: string[];
  experienceTypes?: string[];
  employmentTypes?: string[];
  companySizes?: string[];
  educationLevels?: string[];
  areaTypes?: string[];
  industryTypes?: string[];
  withEnded: boolean;
}
