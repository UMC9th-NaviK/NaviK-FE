import StudyCard3 from '../../components/social/study/StudyCard3';

export default function MyParticipatingPage() {
  return (
    <div className="mt-2">
      <StudyCard3
        title="스터디명"
        currentCount={3}
        maxCount={5}
        description="스터디에 관한 간단한 소개"
        periodText="2025년 1월 7일 ~ 1월 14일"
        network="오프라인"
        percentage={20}
        onClick={() => console.log('StudyCard3 click!')}
      />
      <StudyCard3
        title="스터디명"
        currentCount={3}
        maxCount={5}
        percentage={20}
        description="스터디에 관한 간단한 소개"
        periodText="2025년 1월 7일 ~ 1월 14일"
        network="오프라인"
        onClick={() => console.log('StudyCard3 click!')}
      />
    </div>
  );
}
