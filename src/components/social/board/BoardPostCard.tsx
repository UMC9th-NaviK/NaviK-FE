import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '../../../assets/social/material-symbols_favorite-outline-rounded.svg';
import ChatIcon from '../../../assets/social/material-symbols_chat-outline-rounded.svg';
import ProfileIcon from '../../../assets/social/Ellipse 30.svg';

import type { BoardListItem } from '../../../types/board';
import { makeExcerpt } from '../../../utils/makeExcerpt';
import { timeAgo } from '../../../utils/timeAgo';

type Props = {
  board: BoardListItem;
};

const BoardPostCard = ({ board }: Props) => {
  const navigate = useNavigate();

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/social/board/${board.boardId}`)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') navigate(`/social/board/${board.boardId}`);
      }}
      className="flex w-full cursor-pointer flex-col gap-4 rounded-[8px] border border-[#DBEBFE] bg-white p-4 shadow-[0_0_10px_0_#DBEBFE]"
    >
      <h3 className="text-body-16B text-base-900 line-clamp-1">{board.articleTitle}</h3>

      <p className="text-caption-12M text-opacity-black-60 line-clamp-2">
        {makeExcerpt(board.articleContent)}
      </p>

      <div className="flex items-center gap-4">
        <div className="text-caption-12M text-opacity-black-40 flex items-center gap-1.5">
          <img src={FavoriteIcon} alt="좋아요" className="h-4 w-4" />
          <span>{board.likeCount}</span>
        </div>
        <div className="text-caption-12M text-opacity-black-40 flex items-center gap-1.5">
          <img src={ChatIcon} alt="댓글" className="h-4 w-4" />
          <span>{board.commentCount}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <img
          src={board.profileImageUrl ?? ProfileIcon}
          alt="프로필"
          className="h-8 w-8 rounded-full"
        />
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="text-base-900 text-[12px] font-bold">{board.nickname}</span>
          <div className="flex justify-between">
            <span className="text-caption-12R text-opacity-black-40">
              {board.isEntryLevel ? '신입' : '마스터'} {board.jobName} | LV.{board.level}
            </span>
            <span className="text-caption-12M text-opacity-black-20">
              {timeAgo(board.createdAt)}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BoardPostCard;
