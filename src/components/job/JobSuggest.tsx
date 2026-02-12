import { useRef } from 'react';
import RecruitmentCard from '../report/RecruitmentCard';
import { useUser } from '../../hooks/useUser';

const JobSuggest = () => {
  const { name } = useUser();

  const scrollRef = useRef<HTMLDivElement>(null);
  const totalItems = 20;

  return (
    <div className="bg-base-100 shadow-card flex flex-col gap-4 rounded-2xl py-4">
      <div className="flex items-center justify-between px-4">
        <span className="text-heading-18B text-base-900 flex">
          <span className="text-primary-blue-500">💡{name || '사용자'}</span>
          님을 위한 추천 공고
        </span>
        <button className="text-opacity-black-60 text-caption-12M flex items-center gap-1">
          더보기
          <img src="/icons/reports/arrow-right-gray.svg" className="h-4 w-4" />
        </button>
      </div>
      <div className="flex flex-col gap-3">
        {/* TODO: 공고 컴포넌트 슬라이더 변경 */}
        <div
          ref={scrollRef}
          className="scrollbar-hide flex flex-nowrap gap-4 overflow-x-auto scroll-smooth px-4"
        >
          {Array.from({ length: totalItems }).map((_, idx) => (
            <div key={idx} className="flex-none snap-center">
              <RecruitmentCard />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default JobSuggest;
