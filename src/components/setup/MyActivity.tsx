const MyActivity = () => {
  return (
    <div className="bg-base-100/80 border-primary-blue-500 flex flex-col gap-4 rounded-2xl border p-4 backdrop-blur-sm">
      <span>
        <p className="text-opacity-black-80 text-heading-20B">나의 경험 기록하기</p>
        <p className="text-opacity-black-40 text-body-14M">
          나의 활동을 작성하고, AI 분석을 진행해봐요
        </p>
      </span>
      <div className="shadow-card bg-base-100 text-opacity-black-40 text-caption-12M rounded-lg p-4">
        나의 활동을 입력해주세요. (임시)
      </div>
      <button className="text-body-14R text-opacity-black-40 flex gap-1">
        <img src="/icons/jobs/file.svg" className="h-6 w-6 items-center" />
        <p>PDF 파일 추가</p>
      </button>
    </div>
  );
};

export default MyActivity;
