import type { Recruitment } from '../../types/recruits';

const RecruitmentCard = ({ recruitment }: { recruitment: Recruitment }) => {
  const locationTag = recruitment.workPlace
    ? recruitment.workPlace.split(' ').slice(0, 2).join(' ')
    : '지역 미정';

  return (
    <div className="flex h-[217px] w-[284px] flex-col gap-[16px] rounded-lg border border-[#D6D6D6] px-4 py-3">
      <div className="flex flex-col gap-[16px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center gap-2">
            <img
              src={recruitment.companyLogo}
              className="h-6 w-auto shrink-0 object-contain"
              alt={`${recruitment.companyName} logo`}
            />
            <div className="text-body-14M truncate text-[#111111CC]">{recruitment.companyName}</div>
          </div>

          <div className="flex items-center justify-center gap-2">
            <div className="text-caption-12M flex h-[25px] w-[43px] items-center justify-center rounded-lg border border-[#E72326]/10 bg-[#E72326]/10 text-red-500">
              {recruitment.dday ? `D-${recruitment.dday}` : '상시'}
            </div>
          </div>
        </div>

        <div className="text-body-16B truncate font-bold text-[#111111CC]">{recruitment.title}</div>
      </div>

      <div className="flex flex-col gap-y-[8px]">
        <div className="flex items-center gap-x-[8px]">
          <div className="scrollbar-hide flex items-center gap-x-1 overflow-x-auto">
            <Tag text={locationTag} />
            <Tag text={recruitment.experience || '경력무관'} />
            <Tag text={recruitment.employment || '고용형태'} />
          </div>
        </div>

        <div className="flex items-center gap-x-1">
          <div className="border-primary-blue-200 bg-primary-blue-100 flex h-6 w-fit items-center justify-center rounded-xl border px-2">
            <span className="text-caption-12M text-primary-blue-600">Na:viK이 추천해요!</span>
          </div>
          {recruitment.recommend && (
            <div className="border-primary-blue-200 bg-primary-100 flex h-6 w-fit items-center justify-center rounded-xl border px-2">
              <span className="text-caption-12M text-primary-blue-600">당신에게 충분한 역량!</span>
            </div>
          )}
        </div>
      </div>

      <button className="text-caption-12B bg-primary-blue-500 text-base-100 h-[32px] rounded-lg font-bold">
        홈페이지 지원하기
      </button>
    </div>
  );
};

export default RecruitmentCard;

const Tag = ({ text }: { text: string }) => (
  <div className="flex h-6 w-fit shrink-0 items-center justify-center rounded-xl border border-[#E3E3E3] bg-[#E3E3E380]/50 px-2">
    <span className="text-base-900/60 text-caption-12M whitespace-nowrap">{text}</span>
  </div>
);
