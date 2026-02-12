import { useRef } from 'react';
import RecruitmentCard from '../report/RecruitmentCard';
import { useUser } from '../../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import { useRecruitments } from '../../hooks/useRecruitments';

const JobSuggest = () => {
  const { name } = useUser();
  const navigate = useNavigate();

  const scrollRef = useRef<HTMLDivElement>(null);

  const { recruitments, isLoading: isRecruitLoading } = useRecruitments();

  return (
    <div className="bg-base-100 shadow-card flex flex-col gap-4 rounded-2xl py-4">
      <div className="flex items-center justify-between px-4">
        <span className="text-heading-18B text-base-900 flex">
          <span className="text-primary-blue-500">💡{name || '사용자'}</span>
          님을 위한 추천 공고
        </span>
        <button
          className="text-opacity-black-60 text-caption-12M flex items-center gap-1"
          onClick={() => {
            navigate('/mypage/recommend');
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
          {isRecruitLoading ? (
            <div className="text-base-400 flex h-54.25 w-full items-center justify-center">
              공고를 불러오는 중...
            </div>
          ) : (
            recruitments.map((recruitment) => (
              <div key={recruitment.id} className="flex-none snap-center">
                <RecruitmentCard recruitment={recruitment} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
export default JobSuggest;
