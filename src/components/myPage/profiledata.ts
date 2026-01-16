import PMImg from '../../../images/mypage/PmImg.svg';
import DesginerImg from '../../../images/mypage/designerImg.svg';
import FeImg from '../../../images/mypage/FeImg.svg';
import BeImg from '../../../images/mypage/FeImg.svg';

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
