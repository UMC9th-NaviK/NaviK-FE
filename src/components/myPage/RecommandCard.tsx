import type { Recruitment } from '../../types/recruits';

interface RecommandCardProps {
  data: Recruitment;
  className?: string;
}

const RecommandCard = ({ data, className }: RecommandCardProps) => {
  // 근무지 정보 ~~시 ~~구
  const locationTag = data.workPlace
    ? data.workPlace.split(' ').slice(0, 2).join(' ')
    : '지역 미정';

  return (
    <div
      className={`flex h-auto w-72 flex-col gap-3 rounded-lg border border-[#D6D6D6] px-4 py-3 ${className ?? ''}`}
    >
      {/* 로고 및 D-Day */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden">
          <img
            src={data.companyLogo}
            className="h-6 w-auto shrink-0 object-contain"
            alt={`${data.companyName} logo`}
          />
          <div className="text-body-14M truncate text-[#111111CC]">{data.companyName}</div>
        </div>
        <div className="shrink-0">
          <div
            className={`text-caption-12M flex h-7 min-w-11 items-center justify-center rounded-lg border px-2 ${
              data.dday
                ? 'border-[#E72326]/10 bg-[#E72326]/10 text-red-500'
                : 'border-gray-200 bg-gray-100 text-gray-500'
            }`}
          >
            {data.dday ? `D-${data.dday}` : '상시'}
          </div>
        </div>
      </div>

      {/* 공고 제목 */}
      <div className="text-body-16B line-clamp-2 h-12 leading-6 font-bold text-[#111111CC]">
        {data.title}
      </div>

      {/* 태그 영역 - 지역, 경험, 고용형태  */}
      <div className="flex flex-col gap-y-1.5">
        <div className="scrollbar-hide flex items-center gap-x-1 overflow-x-auto">
          <Tag text={locationTag} />
          <Tag text={data.experience || '경력무관'} />
          <Tag text={data.employment || '고용형태'} />
        </div>

        <div className="flex items-center gap-x-1">
          <div className="border-primary-blue-200 bg-primary-blue-100 flex h-6 w-fit items-center justify-center rounded-xl border px-2">
            <span className="text-caption-12M text-primary-blue-600">Na:viK이 추천해요!</span>
          </div>
          {data.recommend && (
            <div className="border-primary-blue-200 bg-primary-100 flex h-6 w-fit items-center justify-center rounded-xl border px-2">
              <span className="text-caption-12M text-primary-blue-600">당신에게 충분한 역량!</span>
            </div>
          )}
        </div>
      </div>

      {/* 공고 페이지로 이동 */}
      <button
        onClick={() => window.open(data.link, '_blank')}
        className="text-caption-12B border-primary-blue-500 text-primary-blue-500 h-8 rounded-lg border py-1"
      >
        홈페이지 지원하기
      </button>
    </div>
  );
};

/**
 * 하단 태그용 공통 컴포넌트
 */
const Tag = ({ text }: { text: string }) => (
  <div className="flex h-6 w-fit shrink-0 items-center justify-center rounded-xl border border-[#E3E3E3] bg-[#E3E3E380]/50 px-2">
    <span className="text-base-900/60 text-caption-12M whitespace-nowrap">{text}</span>
  </div>
);

export default RecommandCard;
