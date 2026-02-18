import { useNavigate } from 'react-router-dom';
import { makeExcerpt } from '../../utils/makeExcerpt';
import FavoriteIcon from '../../assets/social/material-symbols_favorite-outline-rounded.svg';
import ChatIcon from '../../assets/social/material-symbols_chat-outline-rounded.svg';
import ProfileIcon from '../../assets/images/profile.png';
import type { BoardListItem } from '../../types/board';
import { timeAgo } from '../../utils/timeAgo';

const HotBoardItem = ({ post }: { post: BoardListItem }) => {
  const navigate = useNavigate();

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/social/board/${post.boardId}`)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') navigate(`/social/board/${post.boardId}`);
      }}
      className="shadow-card border-primary-blue-100 flex w-full cursor-pointer flex-col items-start gap-4 self-stretch rounded-lg border bg-white p-4"
    >
      <h3 className="text-body-16B text-base-900 h-6 self-stretch">{post.articleTitle}</h3>
      <p className="text-caption-12M text-base-900 line-clamp-2 self-stretch">
        {makeExcerpt(post.articleContent, 60)}
      </p>

      <div className="flex h-6 items-center gap-3.25">
        <div className="text-caption-12M text-opacity-black-40 flex items-center gap-1">
          <img src={FavoriteIcon} alt="좋아요" className="h-4 w-4" />
          <span>{post.likeCount}</span>
        </div>

        <div className="text-caption-12M text-opacity-black-40 flex items-center gap-1">
          <img src={ChatIcon} alt="댓글" className="h-4 w-4" />
          <span>{post.commentCount}</span>
        </div>
      </div>

      <div className="flex w-full items-center justify-between">
        <div className="flex w-full items-center gap-2">
          <img src={ProfileIcon} alt="프로필" className="h-8 w-8 rounded-full object-cover" />
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="text-base-900 text-caption-12B">{post.nickname}</span>

            <div className="flex w-full items-center justify-between">
              <span className="text-caption-12R text-opacity-black-40 leading-[140%]">
                {post.jobName} · Lv.{post.level}
              </span>
              <span className="text-caption-12M text-opacity-black-20">
                {timeAgo(post.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default HotBoardItem;
