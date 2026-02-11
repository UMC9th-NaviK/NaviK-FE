import type { ResponseNotice } from '../../types/notice';
import NoticeSection from './NoticeSection';

const TodayNotice = ({ notices }: { notices: ResponseNotice[] }) => {
  return <NoticeSection title="오늘" notices={notices} />;
};
export default TodayNotice;
