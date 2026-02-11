import { useEffect, useState } from 'react';
import StudyCard3 from '../../components/social/study/StudyCard3';
import { getMyStudies } from '../../apis/study';
import type { MyStudyItem } from '../../types/study';

function formatPeriod(start: string, end: string) {
  const s = new Date(start);
  const e = new Date(end);

  return `${s.getFullYear()}년 ${s.getMonth() + 1}월 ${s.getDate()}일 ~ 
${e.getMonth() + 1}월 ${e.getDate()}일`;
}

export default function MyParticipatingPage() {
  const [studies, setStudies] = useState<MyStudyItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [cursor, setCursor] = useState<number | undefined>(undefined);
  const [hasNext, setHasNext] = useState(true);

  useEffect(() => {
    fetchStudies();
  }, []);

  const fetchStudies = async () => {
    if (!hasNext) return;
    try {
      setLoading(true);

      const res = await getMyStudies({
        role: 'STUDY_MEMBER',
        cursor,
        size: 10,
      });

      if (!res.data.isSuccess) {
        console.error(res.data.message);
        return;
      }

      const result = res.data.result;

      setStudies((prev) => [...prev, ...result.content]);

      setCursor(result.nextCursor ? Number(result.nextCursor) : undefined);
      setHasNext(result.hasNext);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-2">
      {studies.map((study) => {
        const percentage =
          study.capacity > 0 ? Math.round((study.currentParticipants / study.capacity) * 100) : 0;
        return (
          <StudyCard3
            key={study.studyUserId}
            title={study.title}
            currentCount={study.currentParticipants}
            maxCount={study.capacity}
            description={study.description}
            periodText={formatPeriod(study.startDate, study.endDate)}
            network={study.participationMethod}
            percentage={percentage}
            kpiName={study.kpiName}
            recruitmentStatus={study.recruitment_status}
            canEvaluate={study.canEvaluate}
            openChatUrl={study.openChatUrl}
            onClick={() => console.log('studyId:', study.studyId)}
          />
        );
      })}

      {hasNext && (
        <button
          onClick={fetchStudies}
          disabled={loading}
          className="mt-4 w-full text-sm text-blue-500"
        >
          {loading ? '불러오는 중...' : '더보기'}
        </button>
      )}
    </div>
  );
}
