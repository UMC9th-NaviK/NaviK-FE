import CardSlider from '../common/CardSlider';
import StudySuggest from './StudySuggest';

const OvercomePower = () => {
  return (
    <div className="flex flex-col gap-8">
      <CardSlider title="극복 역량" />
      <div className="mb-6.75 flex flex-col gap-4 p-4">
        <span className="flex items-center gap-2">
          <img src="/icons/jobs/mouse-cursor.svg" className="h-6 w-6" />
          <p className="text-heading-20B text-base-900 flex">
            이렇게&nbsp;
            <p className="text-primary-blue-500">극복</p>
            하는건 어때요?
          </p>
        </span>
        <StudySuggest />
      </div>
    </div>
  );
};

export default OvercomePower;
