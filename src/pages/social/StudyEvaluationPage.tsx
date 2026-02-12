import { useParams } from 'react-router-dom';

import { EVALUATION_DATA } from '../../constants/evaluationData';
import { TagSection } from '../../components/social/evaludate/TagSection';
import { StarRating } from '../../components/social/evaludate/StarRating';
import { MemberSelect } from '../../components/social/evaludate/MemberSelect';
import { useStudyMemberEvaluation } from '../../hooks/useStudyMemberEvaluation';

const StudyEvaluationPage = () => {
  const { studyId } = useParams<{ studyId: string }>();

  // 커스텀 훅에서 상태와 액션 가져오기
  const { state, actions } = useStudyMemberEvaluation(studyId);

  const {
    response,
    isLoading,
    isError,
    selectedMember,
    strengthTags,
    improvementTags,
    rating,
    comment,
    errorItem,
    isPending,
  } = state;

  if (isLoading) return <div className="p-6">데이터를 불러오는 중입니다...</div>;
  if (isError || !response?.result)
    return <div className="p-6">평가 데이터를 찾을 수 없습니다.</div>;

  const { studyName, recruitmentStatus, members } = response.result;

  return (
    <div className="flex flex-col gap-4 pt-6 pb-24">
      <div className="text-heading-18B px-1 font-bold">스터디 평가</div>

      <div className="shadow-card flex min-h-max w-full flex-col gap-4 rounded-2xl bg-white p-4">
        <div className="flex w-full items-center justify-between">
          <div className="text-primary-blue-500 text-heading-18B font-bold">{studyName}</div>
          <div
            className={`text-caption-12M flex h-7.25 w-auto items-center justify-center rounded-full border px-3 py-1.5 ${
              recruitmentStatus === '종료'
                ? 'border-[#E72326]/10 bg-[#E72326]/10 text-[#E72326]'
                : 'border-primary-blue-100 bg-primary-blue-50 text-primary-blue-500'
            }`}
          >
            {recruitmentStatus === '종료' ? '종료' : '진행중'}
          </div>
        </div>

        <div className="border-primary-blue-100 w-full border-t" />

        <MemberSelect
          members={members.map((m) => ({
            id: m.userId,
            name: m.nickname,
            imageUrl: m.profileImageUrl,
          }))}
          selectedMember={selectedMember}
          onSelect={actions.handleSelectMember}
        />

        {selectedMember && (
          <div className="animate-fadeIn mt-4 flex flex-col gap-6">
            <div className="text-caption-12B text-[#E72326]">
              * 각 항목당 최대 5개까지 선택 가능합니다.
            </div>

            <TagSection
              title={EVALUATION_DATA.STRENGTH.title}
              tags={strengthTags}
              sections={EVALUATION_DATA.STRENGTH.sections}
              onToggle={(item) => actions.handleToggleTag('STRENGTH', item)}
              errorItem={errorItem}
            />

            <TagSection
              title={EVALUATION_DATA.IMPROVEMENT.title}
              tags={improvementTags}
              sections={EVALUATION_DATA.IMPROVEMENT.sections}
              onToggle={(item) => actions.handleToggleTag('IMPROVEMENT', item)}
              errorItem={errorItem}
            />

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
                onChange={(e) => actions.setComment(e.target.value)}
                className="border-primary-blue-200 text-caption-12R focus:ring-primary-blue-500 h-11 w-full rounded-lg border px-5.25 focus:ring-1 focus:outline-none"
                placeholder="본문 내용"
              />
            </section>

            <section className="flex flex-col gap-4 px-1">
              <div className="flex items-center justify-between">
                <div className="text-body-16B text-base-900 font-bold">별점 평가</div>
                <span className="text-caption-12M text-[#E72326]">필수</span>
              </div>
              <StarRating rating={rating} setRating={actions.setRating} />
            </section>

            <button
              onClick={actions.handleSubmit}
              disabled={
                isPending || (strengthTags.length < 5 && improvementTags.length < 5) || rating === 0
              }
              className={`text-body-16B flex h-12 w-full items-center justify-center rounded-lg transition-all ${
                !isPending && (strengthTags.length > 0 || improvementTags.length > 0) && rating > 0
                  ? 'bg-primary-blue-500 text-base-100 active:scale-95'
                  : 'bg-base-200 text-base-600 cursor-not-allowed'
              }`}
            >
              {isPending ? '제출 중...' : '평가 제출하기'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyEvaluationPage;
