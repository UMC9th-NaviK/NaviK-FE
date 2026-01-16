type CareerProps = {
  value: '신입' | '경력';
  onChange: (value: '신입' | '경력') => void;
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
          className={`${careerButtonBase} ${value === '신입' ? careerButtonActive : careerButtonInactive}`}
          onClick={() => onChange('신입')}
          disabled={value === '신입'}
        >
          신입
        </button>
        <button
          className={`${careerButtonBase} ${value === '경력' ? careerButtonActive : careerButtonInactive}`}
          onClick={() => onChange('경력')}
          disabled={value === '경력'}
        >
          경력
        </button>
      </div>
    </div>
  );
};

export default Career;
