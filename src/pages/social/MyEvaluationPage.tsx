import { useNavigate } from 'react-router-dom';
import BackIcon from '../../assets/social/material-symbols_arrow-back-ios-new-rounded.svg';
import StudyEvaluationCard from '../../components/social/StudyEvaluationCard/StudyEvaluationCard';

const MyEvaluationPage = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: '[백엔드 포트폴리오 리뷰] 스터디',
      periodText: '2025년 4월 10일 ~ 7월 10일',
      memberText: '6명',
      tags: [{ label: '비대면' }, { label: '주 1회' }, { label: '종료', variant: 'red' as const }],
      strengths: [
        '의견을 정리해서 공유해주는 점이 좋았어요.',
        '과제 준비가 항상 꼼꼼했어요.',
        '팀 분위기를 부드럽게 만들어줘요.',
      ],
      improvements: [
        '발표할 때 조금 더 자신감 있게 말하면 좋겠어요.',
        '의견을 더 적극적으로 내면 좋을 것 같아요.',
      ],
      summary: '발표를 더 많이 해보면 좋을 것 같아요!',
      rating: 4.3,
    },
    {
      title: '[알고리즘] 스터디',
      periodText: '2025년 4월 10일 ~ 7월 10일',
      memberText: '6명',
      tags: [{ label: '비대면' }, { label: '주 1회' }, { label: '종료', variant: 'red' as const }],
      strengths: [
        '의견을 정리해서 공유해주는 점이 좋았어요.',
        '과제 준비가 항상 꼼꼼했어요.',
        '팀 분위기를 부드럽게 만들어줘요.',
      ],
      improvements: [
        '발표할 때 조금 더 자신감 있게 말하면 좋겠어요.',
        '의견을 더 적극적으로 내면 좋을 것 같아요.',
      ],
      summary: '발표를 더 많이 해보면 좋을 것 같아요!',
      rating: 4.3,
    },
    {
      title: '[실전 DB 구조 설계] 스터디',
      periodText: '2025년 4월 10일 ~ 7월 10일',
      memberText: '6명',
      tags: [{ label: '비대면' }, { label: '주 1회' }, { label: '종료', variant: 'red' as const }],
      strengths: [
        '의견을 정리해서 공유해주는 점이 좋았어요.',
        '과제 준비가 항상 꼼꼼했어요.',
        '팀 분위기를 부드럽게 만들어줘요.',
      ],
      improvements: [
        '발표할 때 조금 더 자신감 있게 말하면 좋겠어요.',
        '의견을 더 적극적으로 내면 좋을 것 같아요.',
      ],
      summary: '발표를 더 많이 해보면 좋을 것 같아요!',
      rating: 4.3,
    },
  ];

  return (
    <div className="bg-base-50 min-h-dvh">
      <div className="flex w-full flex-col gap-[10px] self-stretch bg-white px-6 py-6">
        <div className="relative flex items-center">
          <button
            type="button"
            aria-label="뒤로가기"
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center"
          >
            <img src={BackIcon} alt="" className="h-5 w-5" />
          </button>

          <h1 className="text-heading-20B text-base-900 absolute left-1/2 -translate-x-1/2">
            내가 받은 평가
          </h1>
        </div>
      </div>

      <div className="flex items-start justify-center gap-[10px] self-stretch bg-blue-50 p-4">
        <div className="w-full max-w-[430px]">
          <p className="text-body-16B text-base-900">스터디별 평가 요약을 모아봤어요!</p>

          <div className="mt-4 flex w-full flex-col gap-4 rounded-2xl border border-white bg-white p-4 shadow-[0_0_10px_0_#DBEBFE]">
            {cards.map((card) => (
              <StudyEvaluationCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyEvaluationPage;
