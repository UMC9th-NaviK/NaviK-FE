import JobKpiItem from './JobKpiItem';
import { keyKPI } from '../../constants/keyKPI';

type JobKpiProps = {
  role: 'pm' | 'designer' | 'front' | 'back';
};

const JobKpi = ({ role }: JobKpiProps) => {
  const kpis = keyKPI[role] || [];

  return (
    <div className="shadow-card bg-base-100 flex flex-col gap-2 rounded-2xl p-4">
      <p className="text-opacity-black-80 text-heading-20B">핵심 KPI</p>
      <div className="flex flex-col">
        {kpis.map((content, idx) => (
          <JobKpiItem key={idx} index={String(idx + 1).padStart(2, '0')} content={content} />
        ))}
      </div>
    </div>
  );
};

export default JobKpi;
