import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonRound from '../common/ButtonRound';

type JobCategory = 'pm' | 'de' | 'fe' | 'be';

const JOB_CATEGORIES: JobCategory[] = ['pm', 'de', 'fe', 'be'];

const JOB_SHADOWS: Record<JobCategory, string> = {
  pm: 'drop-shadow-[0_0_5px_#9A84FF]',
  de: 'drop-shadow-[0_0_5px_#FB9398]',
  fe: 'drop-shadow-[0_0_5px_#F57CFC]',
  be: 'drop-shadow-[0_0_5px_#1EE1A1]',
};

const JobSelect = () => {
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState<JobCategory | null>(null);

  const handleJobSelect = (jobId: JobCategory) => {
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
        <span className="text-opacity-black-80 text-body-16M flex">
          항해자님의&nbsp;
          <span className="text-body-16B">커리어 출발점을&nbsp;</span>
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
              alt={job.toUpperCase()}
              className={`w-full transition-all duration-300 ${
                selectedJob === job ? JOB_SHADOWS[job] : ''
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
