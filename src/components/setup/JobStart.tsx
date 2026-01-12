import JobSlider from './JobSlider';

const JobStart = ({ onNext }: { onNext: () => void }) => {
  return (
    <div className="relative flex h-full flex-col">
      {/* 안내 텍스트 */}
      <div className="mt-76 flex flex-col items-center">
        <div className="flex flex-col items-center gap-10">
          <p className="text-primary-blue-500 text-heading-20B">안녕하세요, 항해자님</p>
          <p className="text-body-16B text-opacity-black-80 text-center whitespace-pre-line">
            커리어 나침반의 첫 걸음,
            <br />
            <span className="text-primary-blue-500">나빅</span>으로 함께 시작해볼까요?
          </p>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center pb-20">
        <JobSlider />
      </div>
      {/* 버튼 - 하단 고정 */}
      <div className="absolute right-0 bottom-0 left-0 z-20 flex justify-center px-4 pb-8">
        <button
          onClick={onNext}
          className="bg-primary-blue-500 text-body-16B text-base-100 mx-4 w-full cursor-pointer rounded-full py-3"
        >
          나의 직무 선택하기
        </button>
      </div>
    </div>
  );
};

export default JobStart;
