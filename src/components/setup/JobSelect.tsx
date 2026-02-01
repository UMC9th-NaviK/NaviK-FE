import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonRound from '../common/ButtonRound';
import { CATEGORY_INFO, type CategoryId } from '../../constants/category';

const JOB_CATEGORIES: CategoryId[] = ['pm', 'de', 'fe', 'be'];

const JobSelect = () => {
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState<CategoryId | null>(null);

  const handleJobSelect = (jobId: CategoryId) => {
    setSelectedJob(jobId);
  };

  const handleClick = () => {
    if (selectedJob) {
      navigate(`/setup/category/${selectedJob}`);
    }
  };

  return (
    <div className="relative flex min-h-dvh flex-col items-center gap-10 pt-6">
      <div className="flex flex-col items-center gap-2">
        <p className="text-heading-20B text-primary-blue-500">직무 선택</p>
        <span className="text-opacity-black-60 text-body-16M flex">
          항해자님의&nbsp;
          <span className="text-body-16B text-base-600">커리어 출발지를&nbsp;</span>
          골라주세요
        </span>
      </div>

      {/* 카테고리 선택 구역 */}
      <div className="grid grid-cols-2 gap-4 px-4">
        {JOB_CATEGORIES.map((job) => (
          <button
            key={job}
            onClick={() => handleJobSelect(job)}
            className="transition-all duration-300"
          >
            <img
              src={`/images/category/${job}-${selectedJob === job ? 'selected' : 'unselected'}.png`}
              alt={CATEGORY_INFO[job].label}
              className={`w-full transition-all duration-300 ${
                selectedJob === job ? CATEGORY_INFO[job].shadowClass : ''
              }`}
            />
          </button>
        ))}
      </div>

      {/* 버튼 - 하단 고정 */}
      <div className="absolute right-0 bottom-0 left-0 z-20 flex justify-center px-4 pb-6">
        <ButtonRound onClick={handleClick} text="확인" disabled={!selectedJob} />
      </div>
    </div>
  );
};

export default JobSelect;
