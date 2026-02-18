import PMImg from '../../assets/images/mypage/PmImg.svg';
import DesginerImg from '../../assets/images/mypage/designerImg.svg';
import FeImg from '../../assets/images/mypage/FeImg.svg';
import BeImg from '../../assets/images/mypage/FeImg.svg';

export type RoleType = 'PM' | 'DESIGNER' | 'FE' | 'BE';

export const bgStyles: Record<RoleType, string> = {
  PM: 'bg-[linear-gradient(180deg,#4E83F9_0%,#5133FF_100%)]',
  DESIGNER: 'bg-[linear-gradient(180deg,#4E83F9_0%,#F24B74_100%)]',
  FE: 'bg-[linear-gradient(180deg,#4E83F9_0%,#CC27F5_100%)]',
  BE: 'bg-[linear-gradient(180deg,#4E83F9_0%,#15C19A_100%)]',
};

export const roleImages: Record<RoleType, string> = {
  PM: PMImg,
  DESIGNER: DesginerImg,
  FE: FeImg,
  BE: BeImg,
};

export const convertJobToRole = (job: string): RoleType => {
  //맵핑 함수
  const jobMap: Record<string, RoleType> = {
    '프로덕트 매니저': 'PM',
    '프로덕트 디자이너': 'DESIGNER',
    '프론트엔드 개발자': 'FE',
    '백엔드 개발자': 'BE',
  };

  return jobMap[job] || 'FE';
};
