type SurveyCheckProps = {
  value: number;
  label: string;
  isSelected: boolean;
  onSelect: (value: number) => void;
};

const SurveyCheck = ({ value, label, isSelected, onSelect }: SurveyCheckProps) => {
  return (
    <div className="flex w-full flex-1 flex-col items-center gap-1">
      <button className="h-6 w-6 shrink-0 cursor-pointer" onClick={() => onSelect(value)}>
        <img
          src={isSelected ? '/icons/jobs/checked.svg' : '/icons/jobs/unchecked.svg'}
          alt={label}
        />
      </button>
      <p className="text-caption-10M text-opacity-black-60 text-center whitespace-nowrap">
        {label}
      </p>
    </div>
  );
};

export default SurveyCheck;
