import { useNavigate } from 'react-router-dom';
import type { ResponseNotice } from '../../types/notice';
import { formatNoticeTime, getNoticeNavigationPath } from '../../utils/noticeUtils';

type NoticeItemProps = {
  notice: ResponseNotice;
  showBorder?: boolean;
};

const NoticeItem = ({ notice, showBorder = true }: NoticeItemProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const path = getNoticeNavigationPath(notice);

    if (notice.notificationType === 'RECRUITMENT') {
      window.open(path, '_blank', 'noopener,noreferrer');
    } else {
      navigate(path);
    }

    // TODO: 읽음 처리 API 호출
  };

  const time = formatNoticeTime(notice.createdAt);

  return (
    <div
      onClick={handleClick}
      className={`cursor-pointer px-5 py-4 ${!notice.read ? 'bg-white-background' : 'bg-base-200'} ${showBorder ? 'border-b-base-200 border-b' : ''}`}
    >
      <div className="flex items-start justify-between gap-3">
        {!notice.read && (
          <div className="bg-primary-blue-500 mt-1 h-2 w-2 flex-shrink-0 rounded-full" />
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
