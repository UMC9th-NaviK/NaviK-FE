import { useState } from 'react';

interface JobSectionProps {
  initialJob?: string;
  initialIsEntry?: boolean;
  onDataChange?: (isEntry: boolean) => void; // ✅ 추가
}

const JobSection = ({ initialJob, initialIsEntry, onDataChange }: JobSectionProps) => {
  // ✅ 서버에서 넘어온 isEntryLevel 값에 따라 초기 상태 결정
  const [experience, setExperience] = useState<'신입' | '경력'>(
    initialIsEntry === false ? '경력' : '신입',
  );
  const handleToggle = (val: '신입' | '경력') => {
    setExperience(val);
    onDataChange?.(val === '신입'); // 신입이면 true, 경력자면 false 전달
  };

  return (
    <section className="border-primary-blue-200 flex h-33 w-85.75 flex-col items-center justify-center gap-4 rounded-2xl border bg-white shadow-sm">
      <div className="flex w-full items-center justify-between px-4">
        <span className="text-primary-blue-500 text-body-16B">직무 희망</span>
        <div className="border-base-200 text-body-14B bg-base-50 flex h-9.5 w-58.25 items-center justify-center rounded-lg border">
          {initialJob || '직무 정보 없음'}
        </div>
      </div>

      <div className="bg-gray-background flex h-12.5 w-82.75 items-center gap-2 rounded-[64px] px-1.5">
        <button
          onClick={() => handleToggle('신입')}
          className={`text-body-14B h-9.5 flex-1 rounded-[64px] py-2 transition-all duration-200 ${
            experience === '신입'
              ? 'bg-base-100 text-primary-blue-500 shadow-[0px_2px_5px_0px_rgba(0,0,0,0.1)]'
              : 'text-opacity-black-20'
          }`}
        >
          신입
        </button>
        <button
          onClick={() => handleToggle('경력')}
          className={`text-body-14B h-9.5 flex-1 rounded-[64px] py-2 transition-all duration-200 ${
            experience === '경력'
              ? 'bg-base-100 text-primary-blue-500 shadow-[0px_2px_5px_0px_rgba(0,0,0,0.1)]'
              : 'text-opacity-black-20'
          }`}
        >
          경력
        </button>
      </div>
    </section>
  );
};

export default JobSection;
