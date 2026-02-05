import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SearchIcon from '../../assets/social/material-symbols_search-rounded.svg';
import FavoriteIcon from '../../assets/social/material-symbols_favorite-outline-rounded.svg';
import ChatIcon from '../../assets/social/material-symbols_chat-outline-rounded.svg';
import ProfileIcon from '../../assets/social/Ellipse 30.svg';
import { MOCK_POSTS, type BoardPost } from '../../mocks/social/boardPosts';
import { makeExcerpt } from '../../utils/makeExcerpt';
type FilterKey = '전체' | '직무별' | 'HOT';

function cn(...arr: (string | false | undefined)[]) {
  return arr.filter(Boolean).join(' ');
}

function FilterChip({
  label,
  active,
  onClick,
  icon,
  iconGapPx,
}: {
  label: FilterKey;
  active: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  iconGapPx?: 4 | 10;
}) {
  const gapClass = icon ? (iconGapPx === 4 ? 'gap-1' : 'gap-2.5') : '';

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex shrink-0 cursor-pointer items-center justify-center rounded-full px-3 py-2 transition',
        icon ? 'gap-2.5' : '',
        active
          ? 'bg-primary-blue-500'
          : 'bg-primary-blue-100 border-primary-blue-200 border border-[0.5px]',
      )}
    >
      <span
        className={cn(
          'text-caption-12M inline-flex items-center',
          gapClass,
          active ? 'text-base-100' : 'text-opacity-black-80',
        )}
      >
        {icon}
        {label}
      </span>
    </button>
  );
}

function SearchBar({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div className="border-primary-blue-100 bg-base-100 mt-4 flex w-full flex-col items-center justify-center gap-2.5 self-stretch rounded-[20px] border px-4 py-[10px]">
      <div className="flex w-full items-center justify-between gap-2.5">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="text-body-14R text-opacity-black-40 placeholder:text-opacity-black-40 w-full bg-transparent outline-none"
        />
        <img src={SearchIcon} alt="검색" className="h-5 w-5 shrink-0 cursor-pointer" />
      </div>
    </div>
  );
}

function PostCard({ post }: { post: BoardPost }) {
  const navigate = useNavigate();

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/social/board/${post.id}`)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') navigate(`/social/board/${post.id}`);
      }}
      className="flex w-full cursor-pointer flex-col items-start gap-[10px] self-stretch rounded-[8px] border border-[#DBEBFE] bg-white p-4 shadow-[0_0_10px_0_#DBEBFE]"
    >
      <h3 className="text-body-16B text-base-900 h-6 self-stretch">{post.title}</h3>
      <p className="text-caption-12M text-opacity-black-60 line-clamp-2 self-stretch">
        {makeExcerpt(post.content)}
      </p>

      <div className="flex h-6 items-center gap-4">
        <div className="text-caption-12M text-opacity-black-40 flex items-center gap-1.5">
          <img src={FavoriteIcon} alt="좋아요" className="h-4 w-4" />
          <span>{post.likeCount}</span>
        </div>

        <div className="text-caption-12M text-opacity-black-40 flex items-center gap-1.5">
          <img src={ChatIcon} alt="댓글" className="h-4 w-4" />
          <span>{post.commentCount}</span>
        </div>
      </div>

      <div className="flex w-full items-center justify-between">
        <div className="flex w-full items-center gap-3">
          <img src={ProfileIcon} alt="프로필" className="h-8 w-8 rounded-full object-cover" />
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="text-base-900 text-[12px] leading-[140%] font-bold">
              {post.author}
            </span>

            <div className="flex w-full items-center justify-between">
              <span className="text-caption-12R text-opacity-black-40 leading-[140%]">
                {post.authorMeta}
              </span>
              <span className="text-caption-12M text-opacity-black-20">{post.timeAgo}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function BoardPage() {
  const [filter, setFilter] = useState<FilterKey>('전체');
  const [query, setQuery] = useState('');

  return (
    <div className="mt-4">
      <div className="flex items-center gap-2">
        <FilterChip label="전체" active={filter === '전체'} onClick={() => setFilter('전체')} />
        <FilterChip
          label="직무별"
          active={filter === '직무별'}
          onClick={() => setFilter('직무별')}
          icon={<span aria-hidden>💼</span>}
          iconGapPx={10}
        />
        <FilterChip
          label="HOT"
          active={filter === 'HOT'}
          onClick={() => setFilter('HOT')}
          icon={<span aria-hidden>🔥</span>}
          iconGapPx={4}
        />
      </div>

      <SearchBar value={query} onChange={setQuery} placeholder="검색" />

      <div className="mt-4 flex flex-col gap-4">
        {MOCK_POSTS.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
