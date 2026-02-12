import { useEffect, useMemo, useRef, useState } from 'react';

import StudyCard from '../../components/social/study/StudyCard';
import StudyCard2 from '../../components/social/study/StudyCard2';

import { getStudyRecommendations, applyStudy } from '../../apis/study';
import type { StudyRecommendation } from '../../types/study';

const formatKoShort = (d: string) => {
  const date = new Date(d);
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
};

const formatKoRange = (start: string, end: string) => {
  const s = new Date(start);
  const e = new Date(end);
  return `${s.getFullYear()}년 ${s.getMonth() + 1}월 ${s.getDate()}일 ~ ${e.getMonth() + 1}월 ${e.getDate()}일`;
};

const participationLabelMap: Record<string, string> = {
  ONLINE: '비대면 회의',
  OFFLINE: '대면 회의',
  HYBRID: '온/오프라인',
};

export default function StudyRecommendPage() {
  const [list, setList] = useState<StudyRecommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasNext, setHasNext] = useState(true);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [applyingId, setApplyingId] = useState<number | null>(null);

  const rowRef = useRef<HTMLDivElement | null>(null);
  const fetchPage = async (cursor?: number) => {
    if (loading) return;
    if (!hasNext && cursor !== undefined) return;

    try {
      setLoading(true);
      const res = await getStudyRecommendations({ size: 10, cursor });

      if (!res.data.isSuccess) {
        console.error(res.data);
        return;
      }

      const { content, hasNext: hn, nextCursor: nc } = res.data.result;

      setList((prev) => {
        const prevIds = new Set(prev.map((s) => s.studyId));
        const merged = [...prev];
        content.forEach((item) => {
          if (!prevIds.has(item.studyId)) merged.push(item);
        });
        return merged;
      });

      setHasNext(hn);
      setNextCursor(nc ?? null);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  const handleApply = async (studyId: number) => {
    if (applyingId) return;
    try {
      setApplyingId(studyId);
      const res = await applyStudy(studyId);

      if (!res.data.isSuccess) {
        alert(res.data.message ?? '신청에 실패했어요.');
        return;
      }
      alert(res.data.result || '신청완료');
    } catch (e) {
      console.error(e);
      alert('요청 중 오류가 발생했어요');
    } finally {
      setApplyingId(null);
    }
  };

  useEffect(() => {
    fetchPage(undefined);
  }, []);

  const topPick = list[0];
  const others = useMemo(() => list.slice(1), [list]);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const onScroll = () => {
      if (!hasNext || loading) return;

      const threshold = 80;
      const remain = el.scrollWidth - el.scrollLeft - el.clientWidth;

      if (remain <= threshold) {
        const cursorNum = nextCursor ? Number(nextCursor) : undefined;
        if (cursorNum !== undefined && Number.isFinite(cursorNum)) {
          fetchPage(cursorNum);
        } else {
          console.warn('nextCursor is missing but hasNext=true');
        }
      }
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [hasNext, loading, nextCursor]);
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
        {topPick ? (
          <StudyCard2
            title={topPick.title}
            currentCount={topPick.participantCount}
            maxCount={topPick.capacity}
            description={topPick.description}
            periodText={formatKoRange(topPick.startDate, topPick.endDate)}
            network={
              participationLabelMap[topPick.participationMethod] ?? topPick.participationMethod
            }
            kpiName={topPick.kpiName}
            kpiId={topPick.kpiId}
            onClick={() => handleApply(topPick.studyId)}
          />
        ) : (
          <div className="text-opacity-black-40 rounded-[16px] bg-white p-4 shadow-[0_0_10px_0_#DBEBFE]">
            {loading ? '추천 스터디 불러오는 중...' : '추천 스터디가 아직 없어요.'}
          </div>
        )}
      </div>

      <div className="mt-6 self-stretch">
        <span className="text-[16px] leading-[140%] font-semibold tracking-[-0.32px] text-[#2C2C2C]">
          더 많은 추천 스터디를 보여드릴게요!
        </span>
      </div>
      <div ref={rowRef} className="mt-3 flex gap-4 overflow-x-auto overflow-y-visible py-1">
        {others.map((s) => (
          <StudyCard
            key={s.studyId}
            title={s.title}
            currentCount={s.participantCount}
            maxCount={s.capacity}
            description={s.description}
            network={
              participationLabelMap[topPick.participationMethod] ?? topPick.participationMethod
            }
            periodText={`${formatKoShort(s.startDate)} ~ ${formatKoShort(s.endDate)}`}
            memberText={`${s.capacity}명`}
            kpiName={s.kpiName}
            kpiId={s.kpiId}
            onClick={() => handleApply(s.studyId)}
          />
        ))}

        {loading && (
          <div className="text-opacity-black-40 flex items-center px-2 whitespace-nowrap">
            불러오는 중...
          </div>
        )}
        {/* {!loading && !hasNext && others.length > 0 && (
          <div className="text-opacity-black-40 flex items-center px-2 whitespace-nowrap">끝!</div>
        )} */}
      </div>
      {applyingId && (
        <div className="text-opacity-black-40 text-caption-12M mt-2">신청 처리 중...</div>
      )}
    </div>
  );
}
