import { useState } from 'react';
import { EVALUATION_DATA } from '../../constants/evaluationData';
import { TagSection } from '../../components/social/evaludate/TagSection';
import { StarRating } from '../../components/social/evaludate/StarRating';
import { MemberSelect } from '../../components/social/evaludate/MemberSelect';

// 인터페이스 정의
interface Member {
  id: number;
  name: string;
}

const StudyEvaluationPage = () => {
  const [selectedMember, setSelectedMember] = useState<number | null>(null);

  // 강점과 보완 태그 관리
  const [strengthTags, setStrengthTags] = useState<string[]>([]);
  const [improvementTags, setImprovementTags] = useState<string[]>([]);

  // 별점 및 조언 상태
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [errorItem, setErrorItem] = useState<string | null>(null);
  // 임시 멤버 데이터
  const members: Member[] = [
    { id: 1, name: '김나비' },
    { id: 2, name: '김나비' },
    { id: 3, name: '김나비' },
    { id: 4, name: '김나비' },
    { id: 5, name: '김나비' },
    { id: 6, name: '김나비' },
  ];

  // 태그 선택/해제 로직
  const handleToggleTag = (type: 'STRENGTH' | 'IMPROVEMENT', clickedItem: string) => {
    const isStrength = type === 'STRENGTH';
    const currentTags = isStrength ? strengthTags : improvementTags;
    const setTags = isStrength ? setStrengthTags : setImprovementTags;

    if (currentTags.includes(clickedItem)) {
      setTags(currentTags.filter((t) => t !== clickedItem));
    } else {
      if (currentTags.length >= 5) {
        setErrorItem(clickedItem);
        // 0.5초 뒤에 에러 상태 해제 (애니메이션 시간 고려)
        setTimeout(() => setErrorItem(null), 500);
        return;
      }
      setTags([...currentTags, clickedItem]);
    }
  };

  return (
    <div className="flex flex-col gap-4 pt-6 pb-24">
      <div className="text-heading-18B px-1 font-bold">스터디 평가</div>

      {/* 스터디 정보, 팀원 선택 카드 */}
      <div className="shadow-card flex min-h-max w-full flex-col gap-4 rounded-2xl bg-white p-4">
        <div className="flex w-full items-center justify-between">
          <div className="text-primary-blue-500 text-heading-18B font-bold">
            DB 설계 스터디 (이름)
          </div>
          <div className="text-caption-12M flex h-7.25 w-14 items-center justify-center rounded-full border border-[#E72326]/10 bg-[#E72326]/10 px-3 py-1.5 text-[#E72326]">
            종료
          </div>
        </div>

        <div className="border-primary-blue-100 w-full border-t" />
        <MemberSelect
          members={members}
          selectedMember={selectedMember}
          onSelect={setSelectedMember}
        />

        {/* 평가 상세 영역 */}
        {selectedMember && (
          <div className="animate-fadeIn mt-4 flex flex-col gap-6">
            <div className="text-caption-12B text-[#E72326]">
              * 카테고리와 상관없이 5개를 선택해 주세요!
            </div>

            {/* 강점 섹션 */}
            <TagSection
              title={EVALUATION_DATA.STRENGTH.title}
              tags={strengthTags}
              sections={EVALUATION_DATA.STRENGTH.sections}
              onToggle={(item) => handleToggleTag('STRENGTH', item)}
              errorItem={errorItem}
            />

            {/* 보완 섹션 */}
            <TagSection
              title={EVALUATION_DATA.IMPROVEMENT.title}
              tags={improvementTags}
              sections={EVALUATION_DATA.IMPROVEMENT.sections}
              onToggle={(item) => handleToggleTag('IMPROVEMENT', item)}
              errorItem={errorItem}
            />

            {/* 조언 */}
            <section className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="text-body-16B text-base-900 font-bold">
                  조금 더 도움이 될 조언이 있다면 적어주세요!
                </div>
                <span className="text-caption-12M text-base-400">선택</span>
              </div>
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="border-primary-blue-200 text-caption-12R focus:ring-primary-blue-500 h-11 w-full rounded-lg border px-5.25 focus:ring-1 focus:outline-none"
                placeholder="본문 내용"
              />
            </section>

            {/* 별점 평가 */}
            <section className="flex flex-col gap-4 px-1">
              <div className="flex items-center justify-between">
                <div className="text-body-16B text-base-900 font-bold">별점 평가</div>
                <span className="text-caption-12M text-[#E72326]">필수</span>
              </div>
              <StarRating rating={rating} setRating={setRating} />
            </section>

            {/* 제출 버튼 */}
            <button
              disabled={strengthTags.length < 5 || improvementTags.length < 5 || rating === 0}
              className={`text-body-16B flex h-12 w-full items-center justify-center rounded-lg transition-all ${
                strengthTags.length === 5 && improvementTags.length === 5 && rating > 0
                  ? 'bg-primary-blue-500 text-base-100 active:scale-95'
                  : 'bg-base-200 text-base-600 cursor-not-allowed'
              }`}
            >
              평가 제출하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyEvaluationPage;
