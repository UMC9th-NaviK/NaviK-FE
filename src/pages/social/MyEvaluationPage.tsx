import { useEffect, useMemo, useState } from 'react';
import BackIcon from '../../assets/social/material-symbols_arrow-back-ios-new-rounded.svg';
import StudyEvaluationCard from '../../components/social/evaluation/StudyEvaluationCard/StudyEvaluationCard';
import EvaluationHeader from '../../components/social/evaluation/EvaluationHeader';

import { getEvaluationStudies, getEvaluationStudyDetail } from '../../apis/evaluation';
import type { EvaluationStudy, EvaluationStudyDetail } from '../../types/evaluation';

type CardVM = {
  title: string;
  periodText: string;
  memberText: string;
  tags: { label: string; variant?: 'gray' | 'red' }[];
  strengths: string[];
  improvements: string[];
  summary: string;
  rating: number;
};

const statusLabelMap: Record<string, { label: string; variant?: 'gray' | 'red' }> = {
  RECURRING: { label: '모집중', variant: 'gray' },
  IN_PROGRESS: { label: '진행중', variant: 'gray' },
  CLOSED: { label: '종료', variant: 'red' },
};

const participationLabelMap: Record<string, string> = {
  ONLINE: '비대면 회의',
  OFFLINE: '대면 회의',
  ON_OFFLINE: '온/오프라인',
};

const formatKoRange = (start: string, end: string) => {
  const s = new Date(start);
  const e = new Date(end);
  return `${s.getFullYear()}년 ${s.getMonth() + 1}월 ${s.getDate()}일 ~ ${e.getFullYear()}년 ${
    e.getMonth() + 1
  }월 ${e.getDate()}일`;
};

const toCardVM = (detail: EvaluationStudyDetail): CardVM => {
  const statusInfo = statusLabelMap[detail.status] ?? { label: detail.status, variant: 'gray' };
  const participation =
    participationLabelMap[detail.participationMethod] ?? detail.participationMethod;

  return {
    title: detail.studyName,
    periodText: formatKoRange(detail.startDate, detail.endDate),
    memberText: `${detail.memberCount}명`,
    tags: [
      { label: participation, variant: 'gray' },
      { label: `주 ${detail.weekTime}회`, variant: 'gray' },
      { label: statusInfo.label, variant: statusInfo.variant },
    ],
    strengths: Array.isArray(detail.strengths) ? detail.strengths : [],
    improvements: Array.isArray(detail.improvements) ? detail.improvements : [],
    summary: Array.isArray(detail.adviceList) ? (detail.adviceList[0] ?? '') : '',
    rating: Number(detail.averageScore ?? 0),
  };
};

const MyEvaluationPage = () => {
  const [studies, setStudies] = useState<EvaluationStudy[]>([]);
  const [details, setDetails] = useState<Record<number, EvaluationStudyDetail>>({});
  const [loading, setLoading] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const [hasNext, setHasNext] = useState(true);
  const [nextCursor, setNextCursor] = useState<string | null>(null);

  const fetchListAndDetails = async (cursor?: number) => {
    if (loading) return;

    try {
      setLoading(true);

      const res = await getEvaluationStudies({ size: 10, cursor });

      if (!res.data.isSuccess) {
        console.error(res.data);
        return;
      }

      const { content, hasNext: hn, nextCursor: nc } = res.data.result;

      setStudies((prev) => {
        const prevIds = new Set(prev.map((x) => x.studyId));
        const merged = [...prev];
        content.forEach((item) => {
          if (!prevIds.has(item.studyId)) merged.push(item);
        });
        return merged;
      });

      setHasNext(hn);
      setNextCursor(nc ?? null);

      const newIds = content.map((x) => x.studyId).filter((id) => details[id] === undefined);

      if (newIds.length > 0) {
        setLoadingDetails(true);

        const results = await Promise.allSettled(
          newIds.map(async (studyId) => {
            const dRes = await getEvaluationStudyDetail(studyId);
            if (!dRes.data.isSuccess) {
              throw new Error(dRes.data.message ?? 'detail fetch failed');
            }
            return { studyId, detail: dRes.data.result };
          }),
        );

        setDetails((prev) => {
          const next = { ...prev };
          results.forEach((r) => {
            if (r.status === 'fulfilled') {
              next[r.value.studyId] = r.value.detail;
            }
          });
          return next;
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setLoadingDetails(false);
    }
  };

  useEffect(() => {
    fetchListAndDetails(undefined);
  }, []);

  const cards: CardVM[] = useMemo(() => {
    return studies
      .map((s) => {
        const d = details[s.studyId];
        if (!d) return null;
        return toCardVM(d);
      })
      .filter(Boolean) as CardVM[];
  }, [studies, details]);

  return (
    <div className="bg-base-50 min-h-dvh bg-[#F5F8FF]">
      <EvaluationHeader BackIcon={BackIcon} />

      <div className="flex items-start justify-center gap-[10px] self-stretch p-4">
        <div className="w-full max-w-[430px]">
          <p className="text-body-16B text-base-900">스터디별 평가 요약을 모아봤어요!</p>

          <div className="mt-4 flex w-full flex-col gap-4 rounded-2xl">
            {loading && cards.length === 0 && (
              <div className="text-opacity-black-40 rounded-2xl bg-white p-4 shadow-[0_0_10px_0_#DBEBFE]">
                불러오는 중...
              </div>
            )}

            {!loading && studies.length === 0 && (
              <div className="text-opacity-black-40 rounded-2xl bg-white p-4 shadow-[0_0_10px_0_#DBEBFE]">
                스터디 평가 내역이 없어요.
              </div>
            )}

            {cards.map((card) => (
              <StudyEvaluationCard key={`${card.title}-${card.periodText}`} {...card} />
            ))}

            {loadingDetails && (
              <div className="text-opacity-black-40 rounded-2xl bg-white p-4 shadow-[0_0_10px_0_#DBEBFE]">
                상세 불러오는 중...
              </div>
            )}

            {!loading && hasNext && (
              <button
                type="button"
                className="bg-primary-blue-500 h-[48px] w-full cursor-pointer rounded-2xl text-white"
                onClick={() => {
                  const cursorNum = nextCursor ? Number(nextCursor) : undefined;
                  fetchListAndDetails(cursorNum);
                }}
              >
                더 보기
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyEvaluationPage;
