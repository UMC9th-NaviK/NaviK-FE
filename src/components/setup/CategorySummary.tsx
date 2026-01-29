import { useNavigate } from 'react-router-dom';
import ButtonRound from '../common/ButtonRound';
import JobSummary from './JobSummary';
import JobKpi from './JobKpi';
import { getJobSummary } from '../../constants/keyKPI';
import NoteActivity from './NoteActivity';

const CategorySummary = ({ categoryId }: { categoryId: string }) => {
  const navigate = useNavigate();
  const summary = getJobSummary(categoryId);

  const handleNext = () => {
    navigate(`/setup/category/${categoryId}?step=3`);
  };

  if (!summary) {
    return null;
  }

  return (
    <div className="bg-white-background relative overflow-hidden px-6 pt-6.5 pb-26">
      <div className="relative z-10 flex flex-col gap-6">
        <JobSummary job={summary.job} title={summary.title} body={summary.body} />
        <JobKpi categoryId={categoryId} />
        <NoteActivity />
      </div>
      <div className="absolute right-0 bottom-0 left-0 z-20 flex justify-center px-4 pb-6">
        <ButtonRound onClick={handleNext} text="다음" />
      </div>
      <div className="radial-blue pointer-events-none absolute bottom-0 left-1/2 z-5 h-157 w-157 -translate-x-1/2 translate-y-1/3 rounded-full" />
    </div>
  );
};

export default CategorySummary;
