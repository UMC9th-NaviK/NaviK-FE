import NoticeItem from './NoticeItem';

type NoticeSectionProps = {
  title: string;
  notices: Array<{ isRead: boolean; text?: string; time?: string }>;
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
        const shouldShowBorder = nextNotice ? notice.isRead === nextNotice.isRead : false;

        return (
          <NoticeItem
            key={index}
            isRead={notice.isRead}
            text={notice.text}
            time={notice.time}
            className={shouldShowBorder ? '' : 'border-b-0!'}
          />
        );
      })}
    </div>
  );
};

export default NoticeSection;
