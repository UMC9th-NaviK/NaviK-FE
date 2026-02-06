import BackIcon from '../../assets/social/material-symbols_arrow-back-ios-new-rounded.svg';
import StudyEvaluationCard from '../../components/social/evaluation/StudyEvaluationCard/StudyEvaluationCard';
import EvaluationHeader from '../../components/social/evaluation/EvaluationHeader';

const MyEvaluationPage = () => {
  const cards = [
    {
      title: '백엔드 포트폴리오 리뷰',
      periodText: '2025년 4월 10일 ~ 7월 10일',
      memberText: '6명',
      tags: [
        { label: '비대면 회의' },
        { label: '주 1회' },
        { label: '종료', variant: 'red' as const },
      ],
      strengths: [
        '의견을 정리해서 공유해주는 점이 좋았어요.',
        '과제 준비가 항상 꼼꼼했어요.',
        '팀 분위기를 부드럽게 만들어줘요.',
        '협업이 좋았어요',
        '의견을 잘 정리해줘요',
      ],
      improvements: [
        '발표할 때 조금 더 자신감 있게 말하면 좋겠어요.',
        '의견을 더 적극적으로 내면 좋을 것 같아요.',
        '발표할 때 조금 더 자신감 있게 말하면 좋겠어요.',
        '의견을 더 적극적으로 내면 좋을 것 같아요.',
        '발표할 때 조금 더 자신감 있게 말하면 좋겠어요.',
      ],
      summary: '발표를 더 많이 해보면 좋을 것 같아요!',
      rating: 4.3,
    },
    {
      title: '알고리즘',
      periodText: '2025년 4월 10일 ~ 7월 10일',
      memberText: '6명',
      tags: [
        { label: '대면 회의' },
        { label: '주 1회' },
        { label: '종료', variant: 'red' as const },
      ],
      strengths: [
        '의견을 정리해서 공유해주는 점이 좋았어요.',
        '과제 준비가 항상 꼼꼼했어요.',
        '팀 분위기를 부드럽게 만들어줘요.',
        '협업이 좋았어요',
        '의견을 잘 정리해줘요',
      ],
      improvements: [
        '발표할 때 조금 더 자신감 있게 말하면 좋겠어요.',
        '의견을 더 적극적으로 내면 좋을 것 같아요.',
        '발표할 때 조금 더 자신감 있게 말하면 좋겠어요.',
        '의견을 더 적극적으로 내면 좋을 것 같아요.',
        '발표할 때 조금 더 자신감 있게 말하면 좋겠어요.',
      ],
      summary: '발표를 더 많이 해보면 좋을 것 같아요!',
      rating: 4.3,
    },
    {
      title: '실전 DB 구조 설계',
      periodText: '2025년 4월 10일 ~ 7월 10일',
      memberText: '6명',
      tags: [
        { label: '비대면 회의' },
        { label: '주 1회' },
        { label: '종료', variant: 'red' as const },
      ],
      strengths: [
        '의견을 정리해서 공유해주는 점이 좋았어요.',
        '과제 준비가 항상 꼼꼼했어요.',
        '팀 분위기를 부드럽게 만들어줘요.',
        '협업이 좋았어요',
        '의견을 잘 정리해줘요',
      ],
      improvements: [
        '발표할 때 조금 더 자신감 있게 말하면 좋겠어요.',
        '의견을 더 적극적으로 내면 좋을 것 같아요.',
        '발표할 때 조금 더 자신감 있게 말하면 좋겠어요.',
        '의견을 더 적극적으로 내면 좋을 것 같아요.',
        '발표할 때 조금 더 자신감 있게 말하면 좋겠어요.',
      ],
      summary: '발표를 더 많이 해보면 좋을 것 같아요!',
      rating: 4.3,
    },
  ];

  return (
    <div className="bg-base-50 min-h-dvh min-h-screen bg-[#F5F8FF]">
      <EvaluationHeader BackIcon={BackIcon} />

      <div className="flex items-start justify-center gap-[10px] self-stretch p-4">
        <div className="w-full max-w-[430px]">
          <p className="text-body-16B text-base-900">스터디별 평가 요약을 모아봤어요!</p>

          <div className="mt-4 flex w-full flex-col gap-4 rounded-2xl">
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
