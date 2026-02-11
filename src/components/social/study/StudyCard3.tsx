import StudyImageFallback from '../../../assets/social/study.png';
import CalendarIcon from '../../../assets/social/material-symbols_calendar-today-rounded.svg';
import PersonIcon from '../../../assets/social/material-symbols_person-rounded.svg';

interface StudyCardProps {
  title: string;
  currentCount: number;
  maxCount: number;
  percentage: number;
  description: string;
  periodText: string;
  network: string;
  kpiName: string;
  recruitmentStatus?: string;
  canEvaluate?: boolean;
  openChatUrl?: string;
  imageSrc?: string;
  className?: string;
  onClick?: () => void;
}

const statusLabelMap: Record<string, string> = {
  RECURRING: '모집중',
  IN_PROGRESS: '진행중',
  CLOSED: '종료',
};

export default function StudyCard3({
  title,
  currentCount,
  maxCount,
  percentage,
  description,
  periodText,
  network,
  kpiName,
  recruitmentStatus,
  canEvaluate,
  openChatUrl,
  imageSrc,
  className = '',

  onClick,
}: StudyCardProps) {
  const isClosed = recruitmentStatus === 'CLOSED';
  const statusLabel = recruitmentStatus
    ? (statusLabelMap[recruitmentStatus] ?? recruitmentStatus)
    : '';
  return (
    <div className="py-2">
      <div
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === '') {
            e.preventDefault();
            onClick?.();
          }
        }}
        className={`flex flex-col self-stretch rounded-[16px] bg-white p-4 shadow-[0_0_10px_0_#DBEBFE] ${className} `}
      >
        <div className="w-full">
          <div className="flex items-center justify-between">
            <span className="text-heading-18B">{title}</span>
            <div className="flex h-[29px] w-[56px] items-center justify-center rounded-[100px] border border-[0.5px] border-[#B8D4FE] bg-[#DBEBFE] px-[12px] py-[6px]">
              <span className="text-caption-12M text-primary-blue-900 whitespace-nowrap">
                {statusLabel}
              </span>
            </div>
          </div>

          <div className="mt-2 h-px self-stretch bg-[#DBEBFE]" />

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
                <span className="text-caption-12M text-opacity-black-80">{kpiName}</span>
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
          url(${imageSrc ?? StudyImageFallback})`,
            }}
          >
            <div className="absolute top-[12px] right-[12px] inline-flex items-center justify-center gap-[10px] rounded-[8px] border border-[#A6A6A6] bg-[rgba(17,17,17,0.4)] px-2 py-1 backdrop-blur-[2px]">
              <span className="text-caption-12M text-white">{network}</span>
            </div>
            <div className="absolute right-4 bottom-4 left-4 flex flex-col items-start gap-[10px] self-stretch rounded-[1000px] bg-[rgba(255,255,255,0.8)] shadow-[0_0_10px_0_rgba(17,17,17,0.2)] backdrop-blur-[2px]">
              <div className="flex w-[103px] items-center justify-end gap-[10px] rounded-[1000px] bg-[linear-gradient(270deg,#4E83F9_0%,#DBEBFE_100%)] px-[8px] py-[6px]">
                <div className="flex flex-col items-center justify-center gap-[10px] rounded-[1000px] bg-[#F5F8FF] px-[8px] py-[4px]">
                  <span className="text-primary-blue-500 text-body-14B">{percentage}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <button
              type="button"
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
                  e.stopPropagation();
                  if (openChatUrl) window.open(openChatUrl, '_blank');
                }}
                className="bg-primary-blue-500 flex h-[48px] w-full cursor-pointer items-center justify-center gap-[10px] rounded-[8px] px-[61px] py-[12px] whitespace-nowrap"
              >
                <span className="text-body-16B text-center text-white">평가하기</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
