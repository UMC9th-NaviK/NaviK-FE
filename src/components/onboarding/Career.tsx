type CareerProps = {
  value: boolean;
  onChange: (value: boolean) => void;
};

const careerButtonBase = 'flex-1 cursor-pointer rounded-full py-3 text-center transition-colors';

const careerButtonActive = 'bg-base-100 text-primary-blue-500 shadow-career-active';
const careerButtonInactive = 'text-opacity-black-20 bg-transparent';

const Career = ({ value, onChange }: CareerProps) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-heading-18B">경력 구분</p>
      <div className="bg-base-200 text-body-16B flex w-full items-center gap-2 rounded-full px-[7.5px] py-1.25">
        <button
          className={`${careerButtonBase} ${value ? careerButtonActive : careerButtonInactive}`}
          onClick={() => onChange(true)}
          disabled={value === true}
        >
          신입
        </button>
        <button
          className={`${careerButtonBase} ${value ? careerButtonInactive : careerButtonActive}`}
          onClick={() => onChange(false)}
          disabled={value === false}
        >
          경력
        </button>
      </div>
    </div>
  );
};

export default Career;
