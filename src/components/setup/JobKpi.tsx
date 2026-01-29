import JobKpiItem from './JobKpiItem';
import { getCategoryInfo } from '../../constants/category';
import { getJobKpis } from '../../constants/keyKPI';

type JobKpiProps = {
  categoryId: string;
};

const JobKpi = ({ categoryId }: JobKpiProps) => {
  const categoryInfo = getCategoryInfo(categoryId);
  const kpis = getJobKpis(categoryId);

  if (!categoryInfo || !kpis) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-heading-20B text-base-900 flex">
        <span className="text-primary-blue-500">{categoryInfo.labelKo}&nbsp;</span>핵심 KPI
      </p>
      <div className="shadow-card bg-base-100 rounded-2xl px-4 py-2">
        <div className="flex flex-col">
          {kpis.map((content, idx) => (
            <JobKpiItem key={idx} index={String(idx + 1).padStart(2, '0')} content={content} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobKpi;
