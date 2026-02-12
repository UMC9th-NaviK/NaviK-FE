import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NextIcon from '../../assets/social/material-symbols_arrow-back-ios-new-rounded (1).svg';
import EvaluationItem from '../../components/social/EvaluationItem';
import { getMyEvaluationSummary } from '../../apis/evaluation';
import type { MyEvaluationSummary } from '../../types/evaluation';

export default function EvaluationPage() {
  const navigate = useNavigate();

  const [summary, setSummary] = useState<MyEvaluationSummary | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        const res = await getMyEvaluationSummary();

        if (!res.data.isSuccess) {
          console.error(res.data);
          return;
        }

        setSummary(res.data.result);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  const avgText = useMemo(() => {
    if (!summary) return '-';
    return Number.isFinite(summary.averageScore) ? summary.averageScore.toFixed(1) : '-';
  }, [summary]);

  const strengths = summary?.topStrengths ?? [];
  const improvements = summary?.topImprovement ?? [];

  return (
    <div className="relative mt-4 min-h-screen overflow-hidden">
      <div className="relative z-10">
        <h2 className="text-heading-20B text-base-900 w-full self-stretch">나의 누적 평가</h2>
        <div className="mt-4 flex w-full flex-col items-center gap-4 self-stretch rounded-2xl border border-white bg-white/50 p-4 shadow-[0_0_10px_0_rgba(219,235,254,1)]">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-body-16">⭐</span>
              <span className="text-body-16B text-base-900">누적 평가 요약</span>
            </div>

            <p className="text-body-14B text-primary-blue-500">
              평균 평점
              <span className="text-body-14B"> {loading ? '...' : avgText}</span>
              <span className="text-body-14B text-opacity-black-40"> / 5</span>
            </p>
          </div>

          <div className="flex w-full flex-col gap-4">
            <span className="text-body-16B text-primary-blue-800">강점 TOP 3</span>
            <div className="flex items-center gap-2">
              <div className="flex w-full flex-col gap-2">
                {loading && !summary ? (
                  <p className="text-opacity-black-40 text-body-14R">불러오는 중...</p>
                ) : strengths.length === 0 ? (
                  <p className="text-opacity-black-40 text-body-14R">아직 강점 데이터가 없어요.</p>
                ) : (
                  strengths
                    .slice(0, 3)
                    .map((text, idx) => (
                      <EvaluationItem
                        key={`strength-${idx}`}
                        index={idx + 1}
                        text={text}
                        variant="strength"
                      />
                    ))
                )}
              </div>
            </div>

            <span className="text-body-16B text-primary-blue-500">보완 TOP 3</span>
            <div className="flex items-center gap-2">
              <div className="flex w-full flex-col gap-2">
                {loading && !summary ? (
                  <p className="text-opacity-black-40 text-body-14R">불러오는 중...</p>
                ) : improvements.length === 0 ? (
                  <p className="text-opacity-black-40 text-body-14R">
                    아직 보완점 데이터가 없어요.
                  </p>
                ) : (
                  improvements
                    .slice(0, 3)
                    .map((text, idx) => (
                      <EvaluationItem
                        key={`improvement-${idx}`}
                        index={idx + 1}
                        text={text}
                        variant="improvement"
                      />
                    ))
                )}
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
    </div>
  );
}
