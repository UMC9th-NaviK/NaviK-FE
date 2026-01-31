import { useRef } from 'react';
import RecommendationNotice from '../report/RecommendationNotice';

const StudySuggest = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const totalItems = 20;
  return (
    <div className="bg-base-100 shadow-card flex flex-col gap-4 rounded-2xl py-4">
      <p className="text-heading-20B text-base-900 flex px-4">
        <span className="text-primary-blue-500">김나비</span>
        님을 위한 추천 스터디📚
      </p>
      <div className="flex flex-col gap-3">
        {/* TODO: 스터디 컴포넌트 슬라이더*/}
        <div
          ref={scrollRef}
          className="scrollbar-hide flex flex-nowrap gap-4 overflow-x-auto scroll-smooth px-4"
        >
          {Array.from({ length: totalItems }).map((_, idx) => (
            <div key={idx} className="flex-none snap-center">
              <RecommendationNotice role={'pm'} />
            </div>
          ))}
        </div>
        <button className="text-opacity-black-60 text-caption-12M flex items-center gap-1 self-end">
          전체 스터디 보러가기
          <img src="/icons/reports/arrow-right-gray.svg" className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default StudySuggest;
