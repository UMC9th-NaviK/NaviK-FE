import type { ResponseNotice } from '../../types/notice';
import NoticeItem from './NoticeItem';

type NoticeSectionProps = {
  title: string;
  notices: ResponseNotice[];
};

const NoticeSection = ({ title, notices }: NoticeSectionProps) => {
  const isToday = title === '오늘';

  return (
    <div>
      <div
        className={`text-heading-18B text-opacity-black-80 border-b-base-200 border-b px-5 pb-4 ${isToday ? 'pt-2.5' : 'pt-4'}`}
      >
        {title}
      </div>
      {notices.map((notice, index) => {
        const nextNotice = notices[index + 1];
        const shouldShowBorder = nextNotice ? notice.read === nextNotice.read : false;

        return (
          <NoticeItem key={notice.notificationId} notice={notice} showBorder={shouldShowBorder} />
        );
      })}
    </div>
  );
};

export default NoticeSection;
