import BackHeader from '../../components/common/BackHeader';
import SevenDaysNotice from '../../components/notification/SevenDaysNotice';
import TodayNotice from '../../components/notification/TodayNotice';
import YesterdayNotice from '../../components/notification/YesterdayNotice';
import { useGetNotices } from '../../hooks/queries/useNotice';
import { groupNoticesByDate } from '../../utils/noticeUtils';

const NoticePage = () => {
  const { data: notices = [], isLoading, isError } = useGetNotices();

  if (isLoading) {
    return (
      <>
        <BackHeader title="알림" />
        <div className="flex min-h-[50vh] items-center justify-center">
          <p className="text-body-14M text-opacity-black-60">알림을 불러오는 중...</p>
        </div>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <BackHeader title="알림" />
        <div className="flex min-h-[50vh] items-center justify-center">
          <p className="text-body-14M text-opacity-black-60">알림을 불러올 수 없습니다.</p>
        </div>
      </>
    );
  }

  if (notices.length === 0) {
    return (
      <>
        <BackHeader title="알림" />
        <div className="flex min-h-[50vh] items-center justify-center">
          <p className="text-body-14M text-opacity-black-60">알림이 없습니다.</p>
        </div>
      </>
    );
  }

  const { today, yesterday, sevenDays } = groupNoticesByDate(notices);

  return (
    <>
      <BackHeader title="알림" />
      <TodayNotice notices={today} />
      <YesterdayNotice notices={yesterday} />
      <SevenDaysNotice notices={sevenDays} />
    </>
  );
};

export default NoticePage;
