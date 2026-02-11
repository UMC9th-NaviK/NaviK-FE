import { useNavigate } from 'react-router-dom';
import type { ResponseNotice } from '../../types/notice';
import { getNoticeNavigationPath } from '../../utils/noticeUtils';
import { useUpdateNotice } from '../../hooks/mutations/useUpdateNotice';
import { timeAgo } from '../../utils/timeAgo';

type NoticeItemProps = {
  notice: ResponseNotice;
  showBorder?: boolean;
};

const NoticeItem = ({ notice, showBorder = true }: NoticeItemProps) => {
  const navigate = useNavigate();
  const { mutate, isPending } = useUpdateNotice();

  const handleClick = () => {
    const path = getNoticeNavigationPath(notice);

    if (!notice.read && !isPending) {
      mutate(notice.notificationId);
    }

    if (notice.notificationType === 'RECRUITMENT') {
      window.open(path, '_blank', 'noopener,noreferrer');
    } else {
      navigate(path);
    }
  };

  const time = timeAgo(notice.createdAt);

  return (
    <div
      onClick={handleClick}
      className={`cursor-pointer px-5 py-4 ${!notice.read ? 'bg-white-background' : 'bg-base-200'} ${showBorder ? 'border-b-base-200 border-b' : ''}`}
    >
      <div className="flex items-start justify-between gap-3">
        {!notice.read && (
          <div className="bg-primary-blue-500 mt-1 h-2 w-2 shrink-0 self-center rounded-full" />
        )}
        <div className="flex-1">
          <p
            className={`text-body-14M ${!notice.read ? 'text-opacity-black-80' : 'text-opacity-black-60'}`}
          >
            {notice.content}
          </p>
        </div>
        <p className="text-caption-12R text-opacity-black-40">{time}</p>
      </div>
    </div>
  );
};

export default NoticeItem;
