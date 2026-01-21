import { useState } from 'react';

const EducationSection = () => {
  //  학력 상태 (하나만 선택)
  const [edu, setEdu] = useState<string>('4년제');

  // 전공 상태 (중복 선택)
  const [majors, setMajors] = useState<string[]>(['공학']);

  const handleEduClick = (val: string) => setEdu(val);

  const handleMajorClick = (val: string) => {
    if (majors.includes(val)) {
      // 이미 있으면 제거!!
      setMajors(majors.filter((item) => item !== val));
    } else {
      setMajors([...majors, val]);
    }
  };

  return (
    <section className="border-primary-blue-200 flex w-85.75 flex-col gap-6 rounded-2xl border bg-white p-4 shadow-[0px_0px_5px_0px_#111111/20]">
      {/*학력 (단일)*/}
      <div className="flex gap-6">
        <span className="text-primary-blue-500 text-body-16B shrink-0 pt-1">학력</span>
        <div className="flex w-70.75 flex-wrap justify-end gap-2">
          {['고졸', '2년제', '4년제', '석/박사'].map((item) => (
            <button
              key={item}
              onClick={() => handleEduClick(item)}
              className={`text-body-14M rounded-lg border px-2 py-1.5 transition-all ${
                edu === item
                  ? 'bg-primary-blue-100 border-primary-blue-200 text-primary-blue-900'
                  : 'border-base-200 text-opacity-black-60 bg-white'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/*전공(중복)*/}
      <div className="flex flex-col gap-2">
        <div className="flex w-77.75 gap-1">
          <span className="text-primary-blue-500 text-body-16B shrink-0 pt-1">전공</span>
          <div className="flex w-70.75 flex-wrap justify-end gap-2">
            {[
              'IT',
              '디자인/미디어',
              '자연/과학/바이오',
              '공학',
              '인문/사회/교육',
              '경영/경제/사무',
            ].map((item) => (
              <button
                key={item}
                onClick={() => handleMajorClick(item)}
                className={`text-body-14M rounded-lg border px-2 py-1.5 transition-all ${
                  majors.includes(item)
                    ? 'bg-primary-blue-100 border-primary-blue-200 text-primary-blue-900'
                    : 'border-base-200 text-opacity-black-60 bg-white'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="text-opacity-black-40 text-caption-10M mt-1 self-end">
          * 전공 중복 선택 가능
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
