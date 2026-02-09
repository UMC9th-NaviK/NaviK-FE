import { Icon } from '@iconify/react';
import type { Recruitment } from '../../../types/recruits';

interface JobCardProps {
  data: Recruitment;
}

export const JobCard = ({ data }: JobCardProps) => {
  // 서버 데이터로부터 필요한 값 추출 및 가공
  const {
    companyName,
    companyLogo,
    title,
    positionName,
    kpis = [],
    hashTags = [],
    dday,
    endDate,
    satisfyExperience,
    satisfyEducation,
    satisfyMajor,
    link,
  } = data;

  // 모든 조건(경력, 학력, 전공)을 만족해야 'isApplicable'로 판단 (형의 기획에 맞춰 조절 가능)
  const isApplicable = satisfyExperience && satisfyEducation && satisfyMajor;

  // 날짜 가공 (예: 2026-02-09T16:56... -> 2026.02.09)
  const formattedDeadline = endDate ? endDate.split('T')[0].replace(/-/g, '.') : '';

  return (
    <div
      onClick={() => window.open(link, '_blank')} // 카드 클릭 시 공고 이동
      className={`border-primary-blue-100 bg-base-100 shadow-card w-full cursor-pointer rounded-2xl border p-5 transition-all active:scale-[0.98] ${
        !isApplicable ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* 기업 로고 - 서버 이미지 적용 */}
        <div
          className={`border-base-100 flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border bg-white`}
        >
          {companyLogo ? (
            <img src={companyLogo} alt={companyName} className="h-full w-full object-contain" />
          ) : (
            <div
              className={`h-full w-full ${isApplicable ? 'bg-primary-blue-500' : 'bg-base-300'}`}
            />
          )}
        </div>

        <div className="flex w-full min-w-0 flex-col">
          {/* 회사, 공고 제목 */}
          <div className="mb-4 flex flex-col">
            <span
              className={`text-body-14B ${isApplicable ? 'text-primary-blue-500' : 'text-opacity-black-60'}`}
            >
              {companyName}
            </span>
            <span className="text-heading-18B text-base-900 truncate leading-tight">{title}</span>
          </div>

          {/* 상세 영역 */}
          <div className="mb-5 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="text-opacity-black-60 flex min-w-20 items-center gap-1.5">
                <Icon icon="material-symbols:business-center-outline-rounded" className="text-16" />
                <span className="text-caption-12B">상세 직무명</span>
              </div>
              <span className="text-caption-12R text-base-800 truncate">
                {positionName || '정보 없음'}
              </span>
            </div>

            <div className="flex flex-col items-start gap-2">
              <div className="text-opacity-black-60 flex min-w-20 items-center gap-1.5 pt-0.5">
                <Icon icon="material-symbols:cards-star-outline" className="text-16" />
                <span className="text-caption-12B">요구 KPI</span>
              </div>
              <ul className="text-caption-12R text-opacity-black-60 flex list-disc flex-col gap-px pl-3">
                {kpis.slice(0, 3).map(
                  (
                    kpi,
                    idx, // 너무 많으면 디자인 깨지니까 3개로 제한
                  ) => (
                    <li key={idx} className="leading-normal">
                      <span className="block truncate">{kpi}</span>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>

          {/* 태그, D-Day */}
          <div className="mb-1 flex items-center gap-2 overflow-hidden">
            {hashTags.map((tag) => (
              <span
                key={tag}
                className="bg-base-200/50 text-opacity-black-60 text-caption-12M border-base-200 shrink-0 rounded-lg border px-2 py-1"
              >
                #{tag}
              </span>
            ))}
            <span
              className={`text-caption-12M shrink-0 rounded-lg border px-2 py-1 transition-all ${
                isApplicable
                  ? 'border-[#E72326]/10 bg-[#E72326]/10 text-[#E72326]'
                  : 'border-base-300 bg-base-200 text-opacity-black-60'
              }`}
            >
              {dday ? `D-${dday}` : '상시'}
            </span>
          </div>
          <span
            className={`text-caption-12B ${isApplicable ? 'text-red-500' : 'text-opacity-black-60'}`}
          >
            {formattedDeadline}까지
          </span>
        </div>
      </div>
    </div>
  );
};
