import { Icon } from '@iconify/react';

interface JobCardProps {
  company: string;
  title: string;
  mainJob: string;
  kpis: string[];
  tags: string[];
  dDay: string;
  deadline: string;
  isApplicable: boolean;
}

export const JobCard = ({
  company,
  title,
  mainJob,
  kpis,
  tags,
  dDay,
  deadline,
  isApplicable,
}: JobCardProps) => {
  return (
    <div
      className={`border-primary-blue-100 bg-base-100 shadow-card mb-4 w-full rounded-2xl border p-5 transition-all ${
        !isApplicable ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* 기업 로고 - 추후 이미지 삽입할 예정!*/}
        <div
          className={`border-base-100 flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border ${
            isApplicable ? 'bg-primary-blue-500' : 'bg-base-300'
          }`}
        >
          {''}
        </div>

        <div className="flex w-full min-w-0 flex-col">
          {/* 회사, 공고 제목 */}
          <div className="mb-4 flex flex-col">
            <span
              className={`text-body-14B ${isApplicable ? 'text-primary-blue-500' : 'text-opacity-black-60'}`}
            >
              {company}
            </span>
            <span className="text-heading-18B text-base-900 leading-tight">{title}</span>
          </div>

          {/* 상세 영역 */}
          <div className="mb-5 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="text-opacity-black-60 flex min-w-20 items-center gap-1.5">
                <Icon icon="material-symbols:business-center-outline-rounded" className="text-16" />
                <span className="text-caption-12B">상세 직무명</span>
              </div>
              <span className="text-caption-12R text-base-800">{mainJob}</span>
            </div>

            <div className="flex flex-col items-start gap-2">
              <div className="text-opacity-black-60 flex min-w-20 items-center gap-1.5 pt-0.5">
                <Icon icon="material-symbols:cards-star-outline" className="text-16" />
                <span className="text-caption-12B">요구 KPI</span>
              </div>
              <ul className="text-caption-12R text-opacity-black-60 flex list-disc flex-col gap-px pl-3">
                {kpis.map((kpi, idx) => (
                  <li key={idx} className="leading-normal">
                    <span className="block truncate">{kpi}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 태그, D-Day */}
          <div className="mb-1 flex items-center gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-base-200/50 text-opacity-black-60 text-caption-12M border-base-200 rounded-lg border px-2 py-1"
              >
                #{tag}
              </span>
            ))}
            {/* 지원 불가면 D-Day 배지도 흑백 필터 때문에 자동으로 회색이 됨 */}
            <span
              className={`text-caption-12M rounded-lg border px-2 py-1 transition-all ${
                isApplicable
                  ? 'border-[#E72326]/10 bg-[#E72326]/10 text-[#E72326]'
                  : 'border-base-300 bg-base-200 text-opacity-black-60'
              }`}
            >
              {dDay}
            </span>
          </div>
          <span
            className={`text-caption-12B ${isApplicable ? 'text-red-500' : 'text-opacity-black-60'}`}
          >
            {deadline}까지
          </span>
        </div>
      </div>
    </div>
  );
};
