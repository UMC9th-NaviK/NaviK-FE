import BackHeader from '../../components/common/BackHeader';
import SevenDaysNotice from '../../components/notification/SevenDaysNotice';
import TodayNotice from '../../components/notification/TodayNotice';
import YesterdayNotice from '../../components/notification/YesterdayNotice';

const NoticePage = () => {
  return (
    <>
      <BackHeader title="알림" />
      <TodayNotice />
      <YesterdayNotice />
      <SevenDaysNotice />
    </>
  );
};

export default NoticePage;
