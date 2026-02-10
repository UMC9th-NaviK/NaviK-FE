export interface Recruitment {
  id: number;
  postId: string;
  link: string;
  companyLogo: string;
  companyName: string;
  companySize: string;
  title: string;
  workPlace: string;
  experience: string;
  employment: string;
  aiSummary: string;
  recommend: boolean;
  dday: number | null;
}
