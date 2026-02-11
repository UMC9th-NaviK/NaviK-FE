import type { ResponseNotice } from '../../types/notice';
import NoticeSection from './NoticeSection';

const YesterdayNotice = ({ notices }: { notices: ResponseNotice[] }) => {
  return <NoticeSection title="어제" notices={notices} />;
};

export default YesterdayNotice;
