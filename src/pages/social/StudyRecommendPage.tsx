import StudyCard from '../../components/social/study/StudyCard';
import StudyCard2 from '../../components/social/study/StudyCard2';

export default function StudyRecommendPage() {
  return (
    <div>
      <div className="mt-8 self-stretch">
        <span className="text-[16px] leading-[140%] font-semibold tracking-[-0.32px] text-[#2C2C2C]">
          나에게 맞는 스터디를 찾고, 함께 성장해요
          <br />
          약점 카드를 기반으로 추천드리는 스터디에요!
        </span>
      </div>

      <div className="mt-4">
        <StudyCard2
          title="스터디명"
          currentCount={3}
          maxCount={5}
          description="스터디에 관한 간단한 소개"
          periodText="2025년 1월 7일 ~ 1월 14일"
          network="오프라인"
          onClick={() => console.log('StudyCard2 click!')}
        />
      </div>

      <div className="mt-6 self-stretch">
        <span className="text-[16px] leading-[140%] font-semibold tracking-[-0.32px] text-[#2C2C2C]">
          더 많은 추천 스터디를 보여드릴게요!
        </span>
      </div>

      <div className="mt-3 flex gap-4 overflow-x-auto overflow-y-visible py-1">
        <StudyCard
          title="스터디명"
          currentCount={3}
          maxCount={5}
          description="스터디에 관한 간단한 소개"
          network="오프라인"
          periodText="1월 7일 ~ 1월 14일"
          memberText="5명"
          onClick={() => console.log('click')}
        />
        <StudyCard
          title="자료구조 스터디"
          currentCount={2}
          maxCount={6}
          description="매주 문제 풀이 + 코드리뷰"
          network="오프라인"
          periodText="1월 10일 ~ 2월 3일"
          memberText="6명"
        />
        <StudyCard
          title="알고리즘 스터디"
          currentCount={2}
          maxCount={6}
          description="매주 문제 풀이 + 코드리뷰"
          periodText="1월 10일 ~ 2월 3일"
          memberText="6명"
          network="오프라인"
        />
      </div>
    </div>
  );
}
