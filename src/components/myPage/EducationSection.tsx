import { useState } from 'react';
import { SelectGroup } from './SelectGroup';
import { DEPARTMENT_MAP, DEPARTMENT_NAME_MAP, EDUCATION_MAP } from '../../constants/filterMapper';

interface EducationSectionProps {
  initialEdu?: string; // 예: 'BACHELOR'
  initialMajors?: string[]; // 예: ['1', '4']
  onDataChange: (edu: string, majors: string[]) => void; // ✅ 부모에게 보고할 구멍 추가
}

export const EducationSection = ({
  initialEdu,
  initialMajors,
  onDataChange,
}: EducationSectionProps) => {
  const [edu, setEdu] = useState<string>(
    initialEdu && EDUCATION_MAP[initialEdu] ? EDUCATION_MAP[initialEdu] : '4년제',
  );

  const [majors, setMajors] = useState<string[]>(
    initialMajors ? initialMajors.map((id) => DEPARTMENT_NAME_MAP[Number(id)] || '기타') : ['공학'],
  );

  // ✅ 학력이 바뀔 때 실행할 함수
  const handleEduClick = (val: string) => {
    setEdu(val);
    onDataChange(val, majors); // 바뀐 학력과 기존 전공을 같이 보냄
  };

  // ✅ 전공이 바뀔 때 실행할 함수
  const handleMajorClick = (val: string) => {
    const nextMajors = majors.includes(val) ? majors.filter((i) => i !== val) : [...majors, val];

    setMajors(nextMajors);
    onDataChange(edu, nextMajors); // 기존 학력과 바뀐 전공을 같이 보냄
  };

  return (
    <section className="border-primary-blue-200 shadow-career-active flex w-85.75 flex-col gap-6 rounded-2xl border bg-white p-4">
      {/* 학력 선택 */}
      <SelectGroup
        label="학력"
        items={['고등', '2년제', '4년제', '석사', '박사']}
        selectedItems={edu}
        onItemClick={handleEduClick} // ✅ 바뀐 핸들러로 교체
      />

      {/* 전공 선택 */}
      <div className="flex flex-col gap-2">
        <SelectGroup
          label="전공"
          items={Object.keys(DEPARTMENT_MAP)}
          selectedItems={majors}
          onItemClick={handleMajorClick} // ✅ 바뀐 핸들러로 교체
        />
        <div className="text-opacity-black-40 text-caption-10M mt-1 self-end">
          * 전공 중복 선택 가능
        </div>
      </div>
    </section>
  );
};
