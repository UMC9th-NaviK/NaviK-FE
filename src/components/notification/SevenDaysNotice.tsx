import NoticeItem from './NoticeItem';

const SevenDaysNotice = () => {
  return (
    <>
      <div className="text-heading-18B text-opacity-black-80 border-b-base-200 border-b px-5 py-4">
        최근 7일
      </div>
      <NoticeItem />
    </>
  );
};

export default SevenDaysNotice;
