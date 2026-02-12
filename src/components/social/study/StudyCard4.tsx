import StudyImageFallback from '../../../assets/social/study.png';
import CalendarIcon from '../../../assets/social/material-symbols_calendar-today-rounded.svg';
import PersonIcon from '../../../assets/social/material-symbols_person-rounded.svg';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStudyApplicants, decideStudyApplicant } from '../../../apis/study';
import type { StudyApplicant } from '../../../types/study';
import ClickIcon from '../../../assets/social/material-symbols_arrow-back-ios-new-rounded (1).svg';
import StarIcon from '../../../assets/social/material-symbols_star-rounded.svg';
import HalfStarIcon from '../../../assets/social/ic_round-star-half.svg';
import EmptyStarIcon from '../../../assets/social/material-symbols_star-outline-rounded.svg';

interface StudyCardProps {
  studyId: number;
  title: string;
  currentCount: number;
  maxCount: number;
  percentage: number;
  description: string;
  periodText: string;
  network: string;
  kpiName?: string;
  kpiId?: number;
  recruitmentStatus?: string;
  openChatUrl?: string;
  canEvaluate?: boolean;
  imageSrc?: string;
  className?: string;
}

const statusLabelMap: Record<string, string> = {
  RECURRING: '모집중',
  IN_PROGRESS: '진행중',
  CLOSED: '종료',
};

function ApplicantCard({
  applicant,
  onDecided,
}: {
  applicant: StudyApplicant;
  onDecided?: (studyUserId: number) => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleDecide = async (accept: boolean) => {
    if (loading) return;
    try {
      setLoading(true);
      const res = await decideStudyApplicant(applicant.studyUserId, { accept });

      if (!res.data.isSuccess) {
        alert(res.data.message ?? '처리에 실패했어요.');
        return;
      }
      onDecided?.(applicant.studyUserId);
    } catch (e) {
      console.error(e);
      alert('요청 중 오류가 발생했어요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-primary-blue-100 flex w-full flex-col rounded-[16px] border bg-white p-4">
      <div className="flex items-start gap-4">
        <img
          src={applicant.profileImageUrl}
          alt="프로필 이미지"
          className="aspect-square h-[48px] w-[48px] flex-shrink-0 rounded-full"
        />

        <div className="flex flex-1 flex-col">
          <div className="flex items-center gap-2">
            <p className="text-[16px] leading-[140%] font-semibold tracking-[-0.32px]">
              {applicant.name}
            </p>
            <p className="text-body-14R text-opacity-black-60">
              {applicant.jobName} | Lv.{applicant.level}
            </p>
          </div>

          <div className="flex items-center gap-[2px]">
            {Array.from({ length: Math.floor(applicant.score) }).map((_, idx) => (
              <img key={`full-${idx}`} src={StarIcon} alt="별점" className="mt-1 h-5 w-5" />
            ))}
            {applicant.score % 1 !== 0 && (
              <img src={HalfStarIcon} alt="반 별점" className="mt-1 h-5 w-5" />
            )}

            {Array.from({
              length: 5 - Math.ceil(applicant.score),
            }).map((_, idx) => (
              <img
                key={`empty-${idx}`}
                src={EmptyStarIcon}
                alt="빈 별점"
                className="mt-1 h-5 w-5"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 flex gap-2">
        <button
          type="button"
          disabled={loading}
          onClick={() => handleDecide(false)}
          className="text-body-14B h-[44px] flex-1 cursor-pointer rounded-[10px] bg-[#F0F0F0] text-[rgba(17,17,17,0.6)]"
        >
          {loading ? '처리중...' : '거절하기'}
        </button>

        <button
          type="button"
          disabled={loading}
          onClick={() => handleDecide(true)}
          className="bg-primary-blue-500 text-body-14B h-[44px] flex-1 cursor-pointer rounded-[10px] text-white"
        >
          {loading ? '처리중...' : '함께하기'}
        </button>
      </div>
    </div>
  );
}

export default function StudyCard4({
  studyId,
  title,
  currentCount,
  maxCount,
  percentage,
  description,
  periodText,
  network,
  kpiName,
  kpiId,
  recruitmentStatus,
  openChatUrl,
  canEvaluate,
  imageSrc,
}: StudyCardProps) {
  const [open, setOpen] = useState(false);
  const [applicants, setApplicants] = useState<StudyApplicant[]>([]);
  const [loadingApplicants, setLoadingApplicants] = useState(false);

  const isClosed = recruitmentStatus === 'CLOSED';
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;

    const fetchApplicants = async () => {
      try {
        setLoadingApplicants(true);

        const res = await getStudyApplicants(studyId, { size: 20 });

        if (!res.data.isSuccess) return;

        setApplicants(res.data.result.content);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingApplicants(false);
      }
    };

    fetchApplicants();
  }, [open, studyId]);
  const handleDecided = (studyUserId: number) => {
    setApplicants((prev) => prev.filter((a) => a.studyUserId !== studyUserId));
  };

  function formatKpiId(id?: number) {
    if (!id) return '';
    const mod = id % 10 === 0 ? 10 : id % 10;
    return String(mod).padStart(2, '0');
  }

  return (
    <div className="py-2">
      <div className="w-full self-stretch rounded-lg bg-white shadow-[0_0_10px_0_#DBEBFE]">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`rounded-4 flex w-full items-center justify-between p-4 ${
            open ? 'rounded-t-lg' : 'rounded-lg'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-heading-18B">{title}</span>
            <div
              className={`flex h-[29px] w-[56px] items-center justify-center rounded-[100px] border px-[12px] py-[6px] ${
                isClosed
                  ? 'border-[0.5px] border-[rgba(231,35,38,0.10)] bg-[rgba(231,35,38,0.10)]'
                  : 'border-[0.5px] border-[#B8D4FE] bg-[#DBEBFE]'
              } `}
            >
              <span
                className={`text-caption-12M whitespace-nowrap ${
                  isClosed ? 'text-[#E72326]' : 'text-primary-blue-900'
                }`}
              >
                {(recruitmentStatus && statusLabelMap[recruitmentStatus]) ??
                  recruitmentStatus ??
                  ''}
              </span>
            </div>
          </div>

          <img
            src={ClickIcon}
            alt="toggle"
            className={`h-4 w-4 cursor-pointer transition-transform duration-200 ease-out ${
              open ? 'rotate-90' : 'rotate-0'
            }`}
          />
        </button>

        {open && (
          <div className="w-full p-4 pt-0">
            <div className="h-px self-stretch bg-[#DBEBFE]" />

            <div className="mt-3 flex items-center gap-2">
              <span className="text-opacity-black-80 text-body-16M">{description}</span>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1.5">
                <img src={CalendarIcon} alt="날짜" className="h-4 w-4 shrink-0" />
                <span className="text-opacity-black-60 text-caption-14R">{periodText}</span>
              </div>
            </div>

            <div className="mt-1 flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <img src={PersonIcon} alt="인원" className="h-4 w-4 shrink-0" />
                <span className="text-body-14B text-primary-blue-500">{currentCount}</span>
                <span className="text-body-14R text-opacity-black-60">/</span>
                <span className="text-body-14R text-opacity-black-60">{maxCount}명</span>
              </div>
            </div>

            <div className="mt-3 flex w-full items-center">
              <div className="flex w-full flex-col rounded-[8px] bg-[#F5F8FF] p-2">
                <div className="flex w-full items-center justify-between">
                  <span className="text-body-14B text-primary-blue-500">KPI 역량</span>
                  <span className="text-caption-12M text-opacity-black-80">
                    {formatKpiId(kpiId)}&nbsp;{kpiName}
                  </span>
                </div>
              </div>
            </div>

            <div
              className="relative mx-auto mt-4 h-[180px] w-[311px] rounded-[8px] bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `
            linear-gradient(
              180deg,
              rgba(17,17,17,0.4) 0%,
              rgba(17,17,17,0.0) 100%
            ),
            url(${imageSrc ?? StudyImageFallback})
          `,
              }}
            >
              <div className="absolute top-[12px] right-[12px] inline-flex items-center justify-center gap-[10px] rounded-[8px] border border-[#A6A6A6] bg-[rgba(17,17,17,0.4)] px-2 py-1 backdrop-blur-[2px]">
                <span className="text-caption-12M text-white">{network}</span>
              </div>

              <div className="absolute right-4 bottom-4 left-4 flex flex-col items-start gap-[10px] self-stretch overflow-hidden rounded-[1000px] bg-[rgba(255,255,255,0.8)] shadow-[0_0_10px_0_rgba(17,17,17,0.2)] backdrop-blur-[2px]">
                <div
                  className="flex items-center justify-end gap-[10px] rounded-[1000px] bg-[linear-gradient(270deg,#4E83F9_0%,#DBEBFE_100%)] px-[8px] py-[6px] transition-all duration-500 ease-out"
                  style={{ width: `${percentage}%`, minWidth: '60px' }}
                >
                  <div className="flex min-w-[45px] flex-col items-center justify-center gap-[10px] rounded-[1000px] bg-[#F5F8FF] px-[8px] py-[4px]">
                    <span className="text-primary-blue-500 text-body-14B whitespace-nowrap">
                      {percentage}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (openChatUrl) {
                    window.open(openChatUrl, '_blank');
                  }
                }}
                className="flex h-[48px] w-full cursor-pointer items-center justify-center gap-[10px] rounded-[8px] bg-[#FEE500] px-[61px] py-[12px] whitespace-nowrap"
              >
                <span className="text-body-16B text-center text-[#111111]">
                  카카오톡 채팅방 바로가기
                </span>
              </button>
            </div>

            {canEvaluate && (
              <div className="mt-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation(); // 카드 토글 방지
                    navigate(`/social/study/${studyId}/evaluation`);
                  }}
                  className="bg-primary-blue-500 flex h-[48px] w-full cursor-pointer items-center justify-center gap-[10px] rounded-[8px] px-[61px] py-[12px] whitespace-nowrap"
                >
                  <span className="text-body-16B text-center text-white">평가하기</span>
                </button>
              </div>
            )}

            {!isClosed && (
              <>
                <div className="mt-6">
                  <h2 className="text-heading-20B text-[#111111]">스터디 신청 현황</h2>
                  <p className="text-body-14M text-opacity-black-40 mt-1">
                    스터디에 함께하고 싶은 멤버를 골라보세요
                  </p>
                </div>

                <div className="mt-3 flex flex-col gap-3">
                  {loadingApplicants && <p>불러오는 중...</p>}
                  {!loadingApplicants && applicants.length === 0 && (
                    <p className="text-opacity-black-40">아직 신청자가 없습니다.</p>
                  )}
                  {applicants.map((applicant) => (
                    <ApplicantCard
                      key={applicant.studyUserId}
                      applicant={applicant}
                      onDecided={handleDecided}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
