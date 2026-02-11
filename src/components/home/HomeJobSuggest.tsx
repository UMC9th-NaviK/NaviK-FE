import { useRef } from 'react';
import RecommandCard from '../myPage/RecommandCard';
import type { Recruitment } from '../../types/recruits';
import { useUser } from '../../hooks/useUser';

interface HomeJobSuggestProps {
  recruitments: Recruitment[];
}

const HomeJobSuggest = ({ recruitments }: HomeJobSuggestProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { name } = useUser();

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between px-4">
          <span className="text-heading-18B text-base-900 flex">
            <span className="text-primary-blue-500">{name}</span>
            님을 위한 추천 공고
          </span>
          <button
            onClick={() => (window.location.href = '/recommend')}
            className="text-opacity-black-60 text-caption-12M flex items-center gap-1"
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
            {recruitments.length > 0 ? (
              recruitments.map((job) => (
                <div key={job.id} className="flex-none snap-center">
                  <RecommandCard data={job} className="bg-base-100 shadow-card" />
                </div>
              ))
            ) : (
              <p className="text-base-400 text-caption-12M w-full py-10 text-center">
                현재 추천 공고가 없습니다.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeJobSuggest;
