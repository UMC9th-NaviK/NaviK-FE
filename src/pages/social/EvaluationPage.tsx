import { useNavigate } from 'react-router-dom';
import NextIcon from '../../assets/social/material-symbols_arrow-back-ios-new-rounded (1).svg';
import EvaluationItem from '../../components/social/EvaluationItem';
export default function EvaluationPage() {
  const navigate = useNavigate();

  return (
    <div className="relative mt-4 min-h-screen overflow-hidden">
      <div className="relative z-10">
        <h2 className="text-heading-20B text-base-900 w-full self-stretch">나의 누적 평가</h2>
        <div className="mt-4 flex w-full flex-col items-center gap-4 self-stretch rounded-2xl border border-white bg-white/50 p-4 shadow-[0_0_10px_0_rgba(219,235,254,1)]">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-body-16">⭐</span>
              <span className="text-body-16B text-base-900">누적 평가 요약</span>
            </div>

            <p className="text-body-14B text-primary-blue-500">
              평균 평점
              <span className="text-body-14B"> 4.3</span>
              <span className="text-body-14B text-opacity-black-40"> / 5</span>
            </p>
          </div>

          <div className="flex w-full flex-col gap-4">
            <span className="text-body-16B text-primary-blue-800">강점 TOP 3</span>
            <div className="flex items-center gap-2">
              <div className="flex w-full flex-col gap-2">
                <EvaluationItem index={1} text="협업이 좋아요" variant="strength" />
                <EvaluationItem index={2} text="약속을 잘 지켜요" variant="strength" />
                <EvaluationItem index={3} text="과제 준비가 꼼꼼해요" variant="strength" />
              </div>
            </div>

            <span className="text-body-16B text-primary-blue-500">보완 TOP 3</span>
            <div className="flex items-center gap-2">
              <div className="flex w-full flex-col gap-2">
                <EvaluationItem index={1} text="협업이 좋아요" variant="improvement" />
                <EvaluationItem index={2} text="약속을 잘 지켜요" variant="improvement" />
                <EvaluationItem index={3} text="과제 준비가 꼼꼼해요" variant="improvement" />
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate('my')}
          className="bg-primary-blue-500 mt-4 flex w-full cursor-pointer items-center justify-between self-stretch rounded-2xl p-4"
        >
          <div className="flex items-center gap-4">
            <span className="text-body-18B text-white">📚</span>
            <span className="text-body-16B text-white">스터디별 나의 평가</span>
          </div>

          <img src={NextIcon} alt="next 버튼" />
        </button>
      </div>
    </div>
  );
}
