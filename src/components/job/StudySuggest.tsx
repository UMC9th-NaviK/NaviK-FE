import { useRef } from 'react';
import RecommendationNotice from '../report/RecommendationNotice';
import { useUser } from '../../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import { ROLE_MAP } from '../../types/role';
import { useStudyRecommend } from '../../hooks/queries/useStudyRecommend';

const StudySuggest = () => {
  const { name } = useUser();
  const navigate = useNavigate();

  const scrollRef = useRef<HTMLDivElement>(null);
  const { data, isLoading } = useStudyRecommend(null, 5);
  const { job } = useUser();
  const mappedRole = ROLE_MAP[job || 'pm'];

  return (
    <div className="bg-base-100 shadow-card flex flex-col gap-4 rounded-2xl py-4">
      <div className="flex items-center justify-between px-4">
        <p className="text-heading-18B text-base-900 flex">
          <span className="text-primary-blue-500">📚{name || '사용자'}</span>
          님을 위한 추천 스터디
        </p>
        <button
          className="text-opacity-black-60 text-caption-12M flex items-center gap-1"
          onClick={() => {
            navigate('/social/study/recommend');
          }}
        >
          더보기
          <img src="/icons/reports/arrow-right-gray.svg" className="h-4 w-4" />
        </button>
      </div>
      <div className="flex flex-col gap-3">
        <div
          ref={scrollRef}
          className="scrollbar-hide flex flex-nowrap gap-4 overflow-x-auto scroll-smooth px-4"
        >
          {isLoading ? (
            <div className="flex w-full animate-pulse">
              <div className="h-[250px] w-full rounded-[8px] bg-gray-100" />
            </div>
          ) : (
            <>
              {data && data.length > 0 ? (
                data.map((_, idx) => (
                  <div key={idx} className="flex-none snap-center">
                    <RecommendationNotice role={mappedRole} />
                  </div>
                ))
              ) : (
                <div className="flex w-full items-center justify-center py-4">
                  <p className="text-caption-12M text-gray-500">추천 스터디가 없습니다.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudySuggest;
