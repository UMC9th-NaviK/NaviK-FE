import { useRef } from 'react';
import type { Recruitment } from '../../types/recruits';
import RecommandCard from '../myPage/RecommandCard';

interface Props {
  recruitments: Recruitment[];
}

const JobSuggest = ({ recruitments }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-base-100 shadow-card flex flex-col gap-4 rounded-2xl py-4">
      <span className="text-heading-20B text-base-900 flex px-4">나를 위한 추천 공고💡</span>
      <div className="flex flex-col gap-3">
        <div
          ref={scrollRef}
          className="scrollbar-hide flex flex-nowrap gap-4 overflow-x-auto scroll-smooth px-4"
        >
          {recruitments.map((item) => (
            <div key={item.id} className="flex-none snap-center">
              <RecommandCard data={item} />
            </div>
          ))}
          {recruitments.length === 0 && (
            <div className="text-caption-12M w-full py-4 text-center text-gray-400">
              추천 공고를 불러오고 있어요...
            </div>
          )}
        </div>
        <button className="text-opacity-black-60 text-caption-12M flex items-center gap-1 self-end px-4">
          전체 공고 보러가기
          <img src="/icons/reports/arrow-right-gray.svg" className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
export default JobSuggest;
