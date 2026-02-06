import { useState } from 'react';
import TeamMemberOn from '../../../public/images/social/TeamMemberOn.svg';
import TeamMemberOff from '../../../public/images/social/TeamMemeberOff.svg';
import { EVALUATION_DATA } from '../../constants/evaluationData';
import { EvaluationAccordion } from '../../components/social/evaludate/EvaluationAccordion';

// 멤버 데이터 타입 정의
interface Member {
  id: number;
  name: string;
}

const StudyEvaluationPage = () => {
  // 상태 관리: 선택된 멤버 ID와 선택된 태그 리스트
  const [selectedMember, setSelectedMember] = useState<number | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // 임시 멤버 데이터
  const members: Member[] = [
    { id: 1, name: '김나비' },
    { id: 2, name: '김나비' },
    { id: 3, name: '김나비' },
    { id: 4, name: '김나비' },
    { id: 5, name: '김나비' },
    { id: 6, name: '김나비' },
  ];

  // 태그 선택/해제 핸들러
  const handleToggleItem = (item: string) => {
    setSelectedTags(
      (prev) =>
        prev.includes(item)
          ? prev.filter((t) => t !== item) // 이미 있으면 제거
          : [...prev, item], // 없으면 추가
    );
  };

  return (
    <div className="flex flex-col gap-4 pt-6 pb-20">
      <div className="text-heading-18B">스터디 평가</div>

      {/* 상단 카드: 스터디 정보 및 팀원 선택 */}
      <div className="shadow-card flex min-h-max w-full flex-col gap-4 rounded-2xl bg-white p-4">
        {/* 스터디 제목 부분 */}
        <div className="flex w-full items-center justify-between">
          <div className="text-primary-blue-500 text-heading-18B">DB 설계 스터디</div>
          <div className="text-caption-12M flex h-7.25 items-center justify-center rounded-full border border-[#E72326]/10 bg-[#E72326]/10 px-3 py-1.5 text-[#E72326]">
            종료
          </div>
        </div>

        {/* 구분선 */}
        <div className="border-primary-blue-100 w-full border-t" />

        {/* 스터디 팀원 선택 부분 */}
        <div className="flex w-full flex-col gap-4">
          <div className="text-body-16B">평가할 스터디원을 선택하세요.</div>

          {/* 팀원 프로필 그리드 */}
          <div className="grid grid-cols-3 gap-4 py-4">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex cursor-pointer flex-col items-center"
                onClick={() => setSelectedMember(member.id)}
              >
                <div className="relative z-0 -mb-5.25 aspect-square w-full">
                  <img
                    src={selectedMember === member.id ? TeamMemberOn : TeamMemberOff}
                    alt="profile"
                    className="h-full w-full object-contain"
                  />
                </div>

                <div
                  className={`z-10 h-9.5 w-full rounded-lg border py-2 text-center transition-all ${
                    selectedMember === member.id
                      ? 'bg-primary-blue-100 border-primary-blue-200 text-primary-blue-600 text-body-16B'
                      : 'border-base-300 bg-base-100 text-base-400 text-body-14B'
                  }`}
                >
                  {member.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 팀원이 선택되었을 때만 평가 섹션 표시 */}
      {selectedMember && (
        <div className="animate-fadeIn mt-4 flex flex-col gap-8 px-1">
          {/* 강점 섹션 */}
          <section className="flex flex-col gap-4">
            <div className="text-heading-18B text-base-900">{EVALUATION_DATA.STRENGTH.title}</div>
            <div className="flex flex-col gap-3">
              {EVALUATION_DATA.STRENGTH.sections.map((cat) => (
                <EvaluationAccordion
                  key={cat.id}
                  category={cat}
                  selectedItems={selectedTags}
                  onToggleItem={handleToggleItem}
                />
              ))}
            </div>
          </section>

          {/* 보완 섹션 */}
          <section className="flex flex-col gap-4">
            <div className="text-heading-18B text-base-900">
              {EVALUATION_DATA.IMPROVEMENT.title}
            </div>
            <div className="flex flex-col gap-2">
              {EVALUATION_DATA.IMPROVEMENT.sections.map((cat) => (
                <EvaluationAccordion
                  key={cat.id}
                  category={cat}
                  selectedItems={selectedTags}
                  onToggleItem={handleToggleItem}
                />
              ))}
            </div>
          </section>
        </div>
      )}

      {/* 하단 플로팅 버튼 (선택 사항) */}
      {selectedTags.length > 0 && (
        <div className="fixed right-0 bottom-6 left-0 px-4">
          <button className="bg-primary-blue-500 text-body-16B w-full rounded-xl py-4 text-white shadow-lg transition-transform active:scale-95">
            평가 완료하기 ({selectedTags.length})
          </button>
        </div>
      )}
    </div>
  );
};

export default StudyEvaluationPage;
