import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import SearchIcon from '../../assets/social/material-symbols_search-rounded.svg';
import FavoriteIcon from '../../assets/social/material-symbols_favorite-outline-rounded.svg';
import ChatIcon from '../../assets/social/material-symbols_chat-outline-rounded.svg';
import ProfileIcon from '../../assets/social/Ellipse 30.svg';
import AddIcon from '../../assets/social/material-symbols_edit-square-outline-rounded.svg';
import type { BoardPost } from '../../mocks/social/boardPosts';
import { makeExcerpt } from '../../utils/makeExcerpt';

import type { BoardListItem } from '../../types/social/board/board';
import { getBoardList, getHotBoardList, getJobBoardList } from '../../apis/board';
import { getJwtPayload } from '../../utils/jwt';
import { jobNameFromSub } from '../../utils/job';
import { timeAgo } from '../../utils/timeAgo';
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
  onEnter,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  onEnter: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div className="border-primary-blue-100 bg-base-100 mt-4 flex w-full flex-col items-center justify-center gap-2.5 self-stretch rounded-[20px] border px-4 py-[10px]">
      <div className="flex w-full items-center justify-between gap-2.5">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              console.log('[ENTER] value:', value);
              onEnter(value);
            }
          }}
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
      onClick={() => {
        navigate(`/social/board/${post.id}`);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') navigate(`/social/board/${post.id}`);
      }}
      className="flex w-full cursor-pointer flex-col items-start gap-4 self-stretch rounded-[8px] border border-[#DBEBFE] bg-white p-4 shadow-[0_0_10px_0_#DBEBFE]"
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
  const [allBoards, setAllBoards] = useState<BoardListItem[]>([]);
  const [boards, setBoards] = useState<BoardListItem[]>([]);
  const [filter, setFilter] = useState<FilterKey>('전체');
  const [query, setQuery] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const [refetchKey, setRefetchKey] = useState(0);

  useEffect(() => {
    if ((location.state as any)?.refresh) {
      setRefetchKey((k) => k + 1);
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.state, navigate, location.pathname]);

  //filter 바뀔 때->서버호출
  useEffect(() => {
    setSearchKeyword('');
    setQuery('');

    let ignore = false;

    (async () => {
      try {
        const baseParams = { size: 30 };
        let res;

        if (filter === 'HOT') {
          res = await getHotBoardList(baseParams);
        } else if (filter === '직무별') {
          const token = localStorage.getItem('accessToken');
          if (!token) {
            if (!ignore) setAllBoards([]);
            return;
          }

          const payload = getJwtPayload(token);
          const myJobName = jobNameFromSub(payload?.sub);

          if (!myJobName) {
            if (!ignore) setAllBoards([]);
            return;
          }

          res = await getJobBoardList({ ...baseParams, jobName: myJobName });
        } else {
          res = await getBoardList({ ...baseParams, sort: ['createdAt,desc'] });
        }

        if (!res.data.isSuccess) {
          if (!ignore) setAllBoards([]);
          return;
        }

        if (!ignore) setAllBoards(res.data.result.content);
      } catch (err) {
        console.error('[BoardPage] list fetch failed:', err);
        if (!ignore) setAllBoards([]);
      }
    })();

    return () => {
      ignore = true;
    };
  }, [filter, refetchKey]);

  //엔터 검색 -> 프론트 필터링
  useEffect(() => {
    const kw = searchKeyword.trim().toLowerCase();

    if (!kw) {
      setBoards(allBoards);
      return;
    }

    const filtered = allBoards.filter((b) => {
      const title = (b.articleTitle ?? '').toLowerCase();
      const content = (b.articleContent ?? '').toLowerCase();
      return title.includes(kw) || content.includes(kw);
    });
    setBoards(filtered);
  }, [allBoards, searchKeyword]);
  useEffect(() => {
    console.log('[DEBUG] searchKeyword:', searchKeyword);
    console.log('[DEBUG] allBoards:', allBoards.length);
    console.log('[DEBUG] boards:', boards.length);
  }, [searchKeyword, allBoards, boards]);

  return (
    <div className="mt-4 min-h-screen">
      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50">
        <div className="relative mx-auto max-w-[390px]">
          <button
            type="button"
            className="bg-primary-blue-500 pointer-events-auto absolute right-1 bottom-0 flex h-[60px] w-[60px] cursor-pointer items-center justify-center gap-[10.714px] rounded-full p-[12.857px] shadow-[0_0_10.714px_0_#94BBFD]"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              navigate('/social/board/new');
            }}
          >
            <img src={AddIcon} alt="작성 버튼" className="h-8 w-8 shrink-0" />
          </button>
        </div>
      </div>
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

      <SearchBar
        value={query}
        onChange={setQuery}
        onEnter={(value) => {
          console.log('[onEnter] query:', query);
          setSearchKeyword(value.trim());
        }}
        placeholder="검색"
      />

      <div className="mt-4 flex flex-col gap-4">
        {boards.map((b) => (
          <PostCard
            key={b.boardId}
            post={{
              id: b.boardId,
              title: b.articleTitle,
              content: b.articleContent,
              likeCount: b.likeCount,
              commentCount: b.commentCount,
              author: b.nickname,
              authorMeta: `${b.isEntryLevel ? '신입' : '마스터'} ${b.jobName} | LV.${b.level}`,
              timeAgo: timeAgo(b.createdAt),
              viewCount: b.viewCount,
            }}
          />
        ))}
      </div>
    </div>
  );
}
