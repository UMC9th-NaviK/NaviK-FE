import { useNavigate } from 'react-router-dom';
import NextIcon from '../../assets/social/material-symbols_arrow-back-ios-new-rounded (1).svg';

export default function EvaluationPage() {
  const navigate = useNavigate();

  function StrengthItem({ index, text }: { index: number; text: string }) {
    return (
      <div className="border-primary-blue-100 flex w-full items-stretch gap-2.5 self-stretch rounded-lg border bg-white p-2">
        <span className="text-body-14M text-primary-blue-800">{index}</span>
        <span className="text-body-14M text-primary-blue-800">{text}</span>
      </div>
    );
  }

  function EvaluationItem({ index, text }: { index: number; text: string }) {
    return (
      <div className="border-primary-blue-100 flex w-full items-stretch gap-2.5 self-stretch rounded-lg border bg-white p-2">
        <span className="text-body-14M text-primary-blue-500">{index}</span>
        <span className="text-body-14M text-primary-blue-500">{text}</span>
      </div>
    );
  }

  return (
    <div className="mt-4">
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
            <span className="text-opacity-black-40"> / 5</span>
          </p>
        </div>

        <div className="flex w-full flex-col gap-4">
          <span className="text-body-16B text-primary-blue-800">강점 TOP 3</span>
          <div className="flex items-center gap-2">
            <div className="flex w-full flex-col gap-2">
              <StrengthItem index={1} text="협업이 좋아요" />
              <StrengthItem index={2} text="약속을 잘 지켜요" />
              <StrengthItem index={3} text="과제 준비가 꼼꼼해요" />
            </div>
          </div>

          <span className="text-body-16B text-primary-blue-500">보완 TOP 3</span>
          <div className="flex items-center gap-2">
            <div className="flex w-full flex-col gap-2">
              <EvaluationItem index={1} text="협업이 좋아요" />
              <EvaluationItem index={2} text="약속을 잘 지켜요" />
              <EvaluationItem index={3} text="과제 준비가 꼼꼼해요" />
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
  );
}
