import CardSlider from '../common/CardSlider';
import ResultButton from './ResultButton';
import StudySuggest from './StudySuggest';

const OvercomePower = () => {
  return (
    <div className="flex flex-col">
      <CardSlider />
      <div className="mb-6.75 flex flex-col gap-4 p-4">
        <span className="flex items-center gap-2">
          <img src="/icons/jobs/mouse-cursor.svg" className="h-6 w-6" />
          <span className="text-heading-20B text-base-900 flex">
            이렇게&nbsp;
            <span className="text-primary-blue-500">극복</span>
            하는건 어때요?
          </span>
        </span>
        <StudySuggest />
        <div className="pt-2">
          <ResultButton />
        </div>
      </div>
    </div>
  );
};

export default OvercomePower;
