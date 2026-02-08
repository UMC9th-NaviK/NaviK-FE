import StudyImageFallback from '../../../assets/social/study.png';
import CalendarIcon from '../../../assets/social/material-symbols_calendar-today-rounded.svg';
import PersonIcon from '../../../assets/social/material-symbols_person-rounded.svg';

interface StudyCardProps {
  title: string;
  currentCount: number;
  maxCount: number;
  description: string;
  periodText: string;
  network: string;
  imageSrc?: string;
  className?: string;
  onClick?: () => void;
}

export default function StudyCard2({
  title,
  currentCount,
  maxCount,
  description,
  periodText,
  network,
  imageSrc,
  className = '',
  onClick,
}: StudyCardProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onClick?.();
      }}
      className={`flex flex-col self-stretch rounded-[16px] bg-white p-4 shadow-[0_0_10px_0_#DBEBFE] ${className} `}
    >
      <div
        className="relative mx-auto h-[180px] w-[311px] rounded-[8px] bg-cover bg-center bg-no-repeat"
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
      </div>

      <div className="mt-4 w-full">
        <div className="flex items-center gap-2">
          <span className="text-heading-18B">{title}</span>
          <span className="text-primary-blue-500 text-body-14M">
            ({currentCount}/{maxCount})
          </span>
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
            <span className="text-body-14R text-opacity-black-60">{maxCount}명</span>
          </div>
        </div>

        <div className="mt-3 flex w-full items-center">
          <div className="flex w-full flex-col rounded-[8px] bg-[#F5F8FF] p-2">
            <div className="flex w-full items-center justify-between">
              <span className="text-body-14B text-primary-blue-500">KPI 역량</span>
              <span className="text-caption-12M text-opacity-black-80">01 문제 정의&가설 수립</span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            className="bg-primary-blue-500 flex h-[48px] w-[150px] cursor-pointer items-center justify-center gap-[10px] rounded-[8px] px-[61px] py-[12px] whitespace-nowrap"
            onClick={(e) => {
              e.stopPropagation();
              onClick?.();
            }}
          >
            <span className="text-body-16B text-center text-white">신청하기</span>
          </button>
        </div>
      </div>
    </div>
  );
}
