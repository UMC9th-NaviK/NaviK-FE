import StudyImageFallback from '../../../assets/social/study.png';

interface StudyCardProps {
  title: string;
  currentCount: number;
  maxCount: number;
  description: string;
  periodText: string;
  memberText: string;
  network: string;
  imageSrc?: string;
  className?: string;
  onClick?: () => void;
}

export default function StudyCard({
  title,
  currentCount,
  maxCount,
  description,
  periodText,
  memberText,
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
      className={`flex w-[240px] cursor-pointer flex-col gap-4 rounded-[16px] bg-white p-4 shadow-[0_0_10px_0_#DBEBFE] ${className} `}
    >
      <div
        className="relative mx-auto flex h-[126px] w-[208px] flex-col items-end gap-[10px] rounded-[8px] bg-[lightgray] bg-cover bg-center bg-no-repeat px-[8px] py-[11px]"
        style={{
          backgroundImage: `url(${imageSrc ?? StudyImageFallback})`,
        }}
      >
        <div className="absolute top-[12px] right-2 inline-flex items-center justify-center gap-[10px] rounded-[8px] border border-[#A6A6A6] bg-[rgba(17,17,17,0.4)] px-2 py-1 backdrop-blur-[2px]">
          <span className="text-caption-12M text-white">{network}</span>
        </div>
      </div>

      <div className="w-full">
        <div className="flex items-center gap-1">
          <span className="text-body-14B">{title}</span>
          <span className="text-primary-blue-500 text-caption-12M">
            ({currentCount}/{maxCount})
          </span>
        </div>

        <div className="mt-2 h-px w-full bg-[#DBEBFE]" />

        <div className="mt-2">
          <span className="text-opacity-black-80 text-caption-12M block items-center justify-center">
            {description}
          </span>
        </div>

        <div className="mt-1 gap-1.5">
          <span className="text-opacity-black-60 text-caption-12R">
            {periodText} / {memberText}
          </span>
        </div>
        <div className="border-primary-blue-100 itmes-center mt-2 inline-flex gap-[10px] rounded-[8px] border bg-[#F5F8FF] px-2 py-1">
          <span className="text-primary-blue-500 text-caption-12M">01 문제 정의&가설 수립</span>
        </div>
      </div>
    </div>
  );
}
