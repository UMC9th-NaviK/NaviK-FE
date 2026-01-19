import NoticeSection from './NoticeSection';

const TodayNotice = () => {
  // TODO: 추후 타입 분리 필요
  const notices: Array<{ isRead: boolean; text?: string; time?: string }> = [];

  return <NoticeSection title="오늘" notices={notices} />;
};
export default TodayNotice;
