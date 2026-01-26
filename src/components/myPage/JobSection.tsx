import { useState } from 'react';

const JobSection = () => {
  const [experience, setExperience] = useState<'신입' | '경력자'>('신입');

  return (
    <section className="border-primary-blue-200 flex h-33 w-85.75 flex-col items-center justify-center gap-4 rounded-2xl border bg-white">
      <div className="flex w-full items-center justify-between px-4">
        <span className="text-primary-blue-500 text-body-16B">직무 희망</span>
        <div className="border-base-200 text-body-14B flex h-9.5 w-58.25 items-center justify-center rounded-lg border">
          백엔드 개발자
        </div>
      </div>

      <div className="bg-gray-background flex h-12.5 w-82.75 items-center gap-2 rounded-[64px] px-1.5">
        {/* 신입 */}
        <button
          onClick={() => setExperience('신입')}
          className={`text-body-14B h-9.5 flex-1 rounded-[64px] py-2 transition-all duration-200 ${
            experience === '신입'
              ? 'bg-base-100 text-primary-blue-500 shadow-[0px_0px_5px_0px_#111111/20]'
              : 'text-opacity-black-20'
          }`}
        >
          신입
        </button>

        {/* 경력자 */}
        <button
          onClick={() => setExperience('경력자')}
          className={`text-body-14B h-9.5 flex-1 rounded-[64px] py-2 transition-all duration-200 ${
            experience === '경력자'
              ? 'bg-base-100 text-primary-blue-500 shadow-[0px_0px_5px_0px_#111111/20]'
              : 'text-opacity-black-20'
          }`}
        >
          경력자
        </button>
      </div>
    </section>
  );
};
export default JobSection;
