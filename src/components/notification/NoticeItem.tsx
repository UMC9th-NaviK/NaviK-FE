type NoticeItemProps = {
  isRead?: boolean;
  text?: string;
  time?: string;
  className?: string;
};

const NoticeItem = ({
  isRead,
  text = '[DB 설계] 스터디가 종료되었습니다. 평가를 남기고 성장 기록을 확인해 보세요!',
  time = '2시간',
  className = '',
}: NoticeItemProps) => {
  return (
    <div
      className={`text-opacity-black-80 border-b-base-400 flex gap-10 border-b p-4 last:border-0 ${isRead ? 'bg-base-200 text-body-14R' : 'text-body-14B bg-white-background'} ${className}`}
    >
      <div className="flex items-center justify-center gap-4">
        {!isRead && <div className="bg-primary-blue-500 h-2 w-2 rounded-full" />}
        <p className="line-clamp-2 flex-1 overflow-hidden text-ellipsis">{text}</p>
      </div>
      <p className="text-caption-12R text-opacity-black-40 whitespace-nowrap">{time}</p>
    </div>
  );
};

export default NoticeItem;
