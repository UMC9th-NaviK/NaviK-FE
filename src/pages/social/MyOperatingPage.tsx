import StudyCard4 from '../../components/social/study/StudyCard4';

export default function MyOperatingPage() {
  return (
    <div className="mt-2">
      <StudyCard4
        title="스터디명"
        currentCount={3}
        maxCount={5}
        percentage={20}
        description="스터디에 관한 간단한 소개"
        periodText="2025년 1월 7일 ~ 1월 14일"
        network="오프라인"
      />
      <StudyCard4
        title="스터디명"
        currentCount={3}
        maxCount={5}
        percentage={20}
        description="스터디에 관한 간단한 소개"
        periodText="2025년 1월 7일 ~ 1월 14일"
        network="오프라인"
      />
      <StudyCard4
        title="스터디명"
        currentCount={3}
        maxCount={5}
        percentage={20}
        description="스터디에 관한 간단한 소개"
        periodText="2025년 1월 7일 ~ 1월 14일"
        network="오프라인"
      />
    </div>
  );
}
