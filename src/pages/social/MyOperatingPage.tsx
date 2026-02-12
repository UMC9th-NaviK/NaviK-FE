import { useEffect, useState, useMemo } from 'react';
import StudyCard4 from '../../components/social/study/StudyCard4';
import { getMyStudies } from '../../apis/study';
import type { MyStudyItem } from '../../types/study';

const participationLabelMap: Record<string, string> = {
  ONLINE: '온라인',
  OFFLINE: '오프라인',
  HYBRID: '온/오프라인',
};

const statusOrder: Record<string, number> = {
  RECURRING: 0,
  IN_PROGRESS: 1,
  CLOSED: 2,
};

function calculateProgress(start: string, end: string) {
  const startDate = new Date(start).getTime();
  const endDate = new Date(end).getTime();
  const now = Date.now();

  if (now <= startDate) return 0;
  if (now >= endDate) return 100;

  const total = endDate - startDate;
  const passed = now - startDate;

  return Math.round((passed / total) * 100);
}
function formatPeriod(start: string, end: string) {
  const s = new Date(start);
  const e = new Date(end);

  return `${s.getFullYear()}년 ${s.getMonth() + 1}월 ${s.getDate()}일 ~ ${e.getMonth() + 1}월 ${e.getDate()}일`;
}
export default function MyOperatingPage() {
  const [studies, setStudies] = useState<MyStudyItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [cursor, setCursor] = useState<number | undefined>(undefined);
  const [hasNext, setHasNext] = useState(true);

  useEffect(() => {
    fetchStudies();
  }, []);

  const fetchStudies = async () => {
    if (loading || !hasNext) return;

    try {
      setLoading(true);

      const res = await getMyStudies({
        role: 'STUDY_LEADER',
        cursor,
        size: 10,
      });

      if (!res.data.isSuccess) {
        console.error(res.data.message);
        return;
      }

      const result = res.data.result;

      setStudies((prev) => {
        const prevIds = new Set(prev.map((x) => x.studyUserId)); // 또는 x.studyId
        const merged = [...prev];

        result.content.forEach((item: MyStudyItem) => {
          if (!prevIds.has(item.studyUserId)) merged.push(item);
        });

        return merged;
      });

      setCursor(result.nextCursor ? Number(result.nextCursor) : undefined);
      setHasNext(result.hasNext);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const sortedStudies = useMemo(() => {
    return [...studies].sort((a, b) => {
      const orderA = statusOrder[a.recruitment_status] ?? 99;
      const orderB = statusOrder[b.recruitment_status] ?? 99;

      if (orderA !== orderB) return orderA - orderB;
      return b.studyId - a.studyId;
    });
  }, [studies]);

  return (
    <div className="mt-2 mb-8">
      {sortedStudies.map((study) => {
        const percentage = calculateProgress(study.startDate, study.endDate);
        return (
          <StudyCard4
            key={study.studyUserId}
            studyId={study.studyId}
            title={study.title}
            currentCount={study.currentParticipants}
            maxCount={study.capacity}
            percentage={percentage}
            kpiName={study.kpiName}
            kpiId={study.kpiId}
            description={study.description}
            periodText={formatPeriod(study.startDate, study.endDate)}
            network={participationLabelMap[study.participationMethod] ?? study.participationMethod}
            recruitmentStatus={study.recruitment_status}
            canEvaluate={study.canEvaluate}
            openChatUrl={study.openChatUrl}
          />
        );
      })}

      {hasNext && (
        <button
          type="button"
          onClick={fetchStudies}
          disabled={loading}
          className="mt-4 w-full text-sm text-blue-500 disabled:opacity-60"
        >
          {loading ? '불러오는 중...' : '더보기'}
        </button>
      )}
    </div>
  );
}
