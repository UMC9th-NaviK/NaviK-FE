import type { ResponseNotice } from '../../types/notice';
import NoticeSection from './NoticeSection';

const SevenDaysNotice = ({ notices }: { notices: ResponseNotice[] }) => {
  return <NoticeSection title="최근 7일" notices={notices} />;
};

export default SevenDaysNotice;
