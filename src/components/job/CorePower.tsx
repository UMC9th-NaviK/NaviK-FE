import CardSlider from '../common/CardSlider';
import JobSuggest from './JobSuggest';

const CorePower = () => {
  return (
    <div className="flex flex-col gap-8">
      <CardSlider title="핵심 역량" />
      <div className="mb-6.75 flex flex-col gap-4 p-4">
        <span className="flex items-center gap-2">
          <img src="/icons/jobs/circle-rounded.svg" className="h-6 w-6" />
          <span className="text-heading-20B text-base-900 flex">
            이렇게&nbsp;
            <span className="text-primary-blue-500">활용</span>
            하면 좋아요!
          </span>
        </span>
        <JobSuggest />
      </div>
    </div>
  );
};

export default CorePower;
