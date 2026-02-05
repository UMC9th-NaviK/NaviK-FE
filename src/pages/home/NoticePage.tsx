import BackHeader from '../../components/common/BackHeader';
import SevenDaysNotice from '../../components/notification/SevenDaysNotice';
import TodayNotice from '../../components/notification/TodayNotice';
import YesterdayNotice from '../../components/notification/YesterdayNotice';

const NoticePage = () => {
  return (
    <>
      <BackHeader title="알림" />
      {/* TODO: 서버 데이터 구조에 따라 변경 예정 */}
      <TodayNotice />
      <YesterdayNotice />
      <SevenDaysNotice />
    </>
  );
};

export default NoticePage;
