import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import AddIcon from '../../assets/social/material-symbols_edit-square-outline-rounded.svg';

import type { BoardListItem } from '../../types/board';
import { getBoardList, getHotBoardList, getJobBoardList } from '../../apis/board';
import { getJwtPayload } from '../../utils/jwt';
import { jobNameFromSub } from '../../utils/job';

import BoardSearchBar from '../../components/social/board/BoardSearchBar';
import BoardPostCard from '../../components/social/board/BoardPostCard';

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
  }, [location.state, location.pathname, navigate]);

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

    setBoards(
      allBoards.filter((b) => {
        const t = (b.articleTitle ?? '').toLowerCase();
        const c = (b.articleContent ?? '').toLowerCase();
        return t.includes(kw) || c.includes(kw);
      }),
    );
  }, [allBoards, searchKeyword]);

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

      <BoardSearchBar value={query} onChange={setQuery} onEnter={(v) => setSearchKeyword(v)} />

      <div className="mt-4 flex flex-col gap-4">
        {boards.map((b) => (
          <BoardPostCard key={b.boardId} board={b} />
        ))}
      </div>
    </div>
  );
}
