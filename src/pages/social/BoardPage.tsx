import { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

import AddIcon from '../../assets/social/material-symbols_edit-square-outline-rounded.svg';

import type { BoardListItem } from '../../types/board';
import { getBoardList, getHotBoardList, getJobBoardList } from '../../apis/board';
import { getJwtPayload } from '../../utils/jwt';
import { jobNameFromSub } from '../../utils/job';

import BoardSearchBar from '../../components/social/board/BoardSearchBar';
import BoardPostCard from '../../components/social/board/BoardPostCard';

type FilterKey = '전체' | '직무별' | 'HOT';

interface BoardLocationState {
  refresh?: boolean;
}

function cn(...arr: (string | false | undefined | null)[]) {
  return arr.filter(Boolean).join(' ');
}

interface FilterChipProps {
  label: FilterKey;
  active: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  iconGapPx?: 4 | 10;
}

function FilterChip({ label, active, onClick, icon, iconGapPx }: FilterChipProps) {
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
  const navigate = useNavigate();
  const location = useLocation();

  const [allBoards, setAllBoards] = useState<BoardListItem[]>([]);
  const [filter, setFilter] = useState<FilterKey>('전체');
  const [query, setQuery] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleFilterChange = (newFilter: FilterKey) => {
    setFilter(newFilter);
    setQuery('');
    setSearchKeyword('');
  };

  const filteredBoards = useMemo(() => {
    const kw = searchKeyword.trim().toLowerCase();
    if (!kw) return allBoards;

    return allBoards.filter((b) => {
      const t = (b.articleTitle ?? '').toLowerCase();
      const c = (b.articleContent ?? '').toLowerCase();
      return t.includes(kw) || c.includes(kw);
    });
  }, [allBoards, searchKeyword]);

  useEffect(() => {
    let ignore = false;

    const fetchBoards = async () => {
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

        if (res.data.isSuccess && !ignore) {
          setAllBoards(res.data.result.content);

          const state = location.state as BoardLocationState;
          if (state?.refresh) {
            navigate(location.pathname, { replace: true, state: null });
          }
        }
      } catch (err) {
        const axiosError = err as AxiosError;
        console.error('[BoardPage] fetch failed:', axiosError.message);
        if (!ignore) setAllBoards([]);
      }
    };

    fetchBoards();

    return () => {
      ignore = true;
    };
  }, [filter, location.state, navigate, location.pathname]);

  return (
    <div className="mt-4 mb-8 min-h-screen">
      {/* 글쓰기 버튼 */}
      <div className="pointer-events-none fixed inset-x-0 bottom-[100px] z-50">
        <div className="relative mx-auto max-w-[390px]">
          <button
            type="button"
            className="bg-primary-blue-500 pointer-events-auto absolute right-1 bottom-0 flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-full shadow-[0_0_10.714px_0_#94BBFD] transition-transform active:scale-95"
            onClick={() => navigate('/social/board/new')}
          >
            <img src={AddIcon} alt="작성 버튼" className="h-8 w-8 shrink-0" />
          </button>
        </div>
      </div>

      {/* 필터 칩 */}
      <div className="flex items-center gap-2">
        <FilterChip
          label="전체"
          active={filter === '전체'}
          onClick={() => handleFilterChange('전체')}
        />
        <FilterChip
          label="직무별"
          active={filter === '직무별'}
          onClick={() => handleFilterChange('직무별')}
          icon={<span aria-hidden>💼</span>}
          iconGapPx={10}
        />
        <FilterChip
          label="HOT"
          active={filter === 'HOT'}
          onClick={() => handleFilterChange('HOT')}
          icon={<span aria-hidden>🔥</span>}
          iconGapPx={4}
        />
      </div>

      {/* 검색 바 */}
      <BoardSearchBar value={query} onChange={setQuery} onEnter={(v) => setSearchKeyword(v)} />

      {/* 게시글 목록 */}
      <div className="mt-4 flex flex-col gap-4">
        {filteredBoards.length > 0 ? (
          filteredBoards.map((b) => <BoardPostCard key={b.boardId} board={b} />)
        ) : (
          <div className="text-base-400 text-caption-14M py-20 text-center">게시글이 없습니다.</div>
        )}
      </div>
    </div>
  );
}
