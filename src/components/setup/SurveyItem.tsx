import SurveyCheck from './SurveyCheck';
import { SURVEY_OPTIONS } from '../../constants/survey';

type SurveyItemProps = {
  number: number;
  title: string;
  selectedValue?: number;
  onSelect: (value: number) => void;
};

const SurveyItem = ({ number, title, selectedValue, onSelect }: SurveyItemProps) => {
  return (
    <div className="bg-base-100 shadow-card flex flex-col gap-4 rounded-2xl p-4">
      <div className="flex items-start gap-2">
        <p className="text-heading-18B text-primary-blue-500">Q{number}.</p>
        <p className="text-body-16B text-opacity-black-80">{title}</p>
      </div>
      <div className="flex justify-between gap-2">
        {SURVEY_OPTIONS.map((option) => (
          <SurveyCheck
            key={option.value}
            value={option.value}
            label={option.label}
            isSelected={selectedValue === option.value}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default SurveyItem;
