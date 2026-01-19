import NoticeItem from './NoticeItem';

const TodayNotice = () => {
  return (
    <>
      <div className="text-heading-18B text-primary-blue-500 border-b-base-200 border-b px-5 pt-2.5 pb-4">
        오늘
      </div>
      <NoticeItem />
    </>
  );
};

export default TodayNotice;
