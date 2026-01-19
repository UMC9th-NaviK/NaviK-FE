import NoticeSection from './NoticeSection';

const YesterdayNotice = () => {
  // TODO: 추후 타입 분리 필요

  const notices: Array<{ isRead: boolean; text?: string; time?: string }> = [
    { isRead: true },
    { isRead: false },
    { isRead: false },
  ];

  return <NoticeSection title="어제" notices={notices} />;
};

export default YesterdayNotice;
