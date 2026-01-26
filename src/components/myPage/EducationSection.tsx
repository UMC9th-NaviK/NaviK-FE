import { useState } from 'react';
import { SelectGroup } from './SelectGroup';

export const EducationSection = () => {
  const [edu, setEdu] = useState<string>('4년제');
  const [majors, setMajors] = useState<string[]>(['공학']);

  const handleMajorClick = (val: string) => {
    setMajors((prev) => (prev.includes(val) ? prev.filter((i) => i !== val) : [...prev, val]));
  };

  return (
    <section className="border-primary-blue-200 shadow-career-active flex w-85.75 flex-col gap-6 rounded-2xl border bg-white p-4">
      {/* 학력 (하나만 선택 가능!) */}
      <SelectGroup
        label="학력"
        items={['고졸', '2년제', '4년제', '석/박사']}
        selectedItems={edu}
        onItemClick={setEdu}
      />

      {/* 전공 (중복 선택 가능!) */}
      <div className="flex flex-col gap-2">
        <SelectGroup
          label="전공"
          items={[
            'IT',
            '디자인/미디어',
            '자연/과학/바이오',
            '공학',
            '인문/사회/교육',
            '경영/경제/사무',
          ]}
          selectedItems={majors}
          onItemClick={handleMajorClick}
        />
        <div className="text-opacity-black-40 text-caption-10M mt-1 self-end">
          * 전공 중복 선택 가능
        </div>
      </div>
    </section>
  );
};
