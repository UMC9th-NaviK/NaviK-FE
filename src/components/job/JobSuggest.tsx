const JobSuggest = () => {
  return (
    <div className="bg-base-100 shadow-card gap-4 rounded-2xl py-4">
      <p className="text-heading-20B text-base-900 flex px-4">
        <p className="text-primary-blue-500">김나비</p>
        님을 위한 추천 공고💡
      </p>
      <div className="flex flex-col gap-3">
        {/* TODO: 공고 컴포넌트 슬라이더 */}
        <button className="text-opacity-black-60 text-caption-12M flex items-center gap-1 self-end">
          전체 공고 보러가기
          <img src="/icons/arrow-right-gray.svg" className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default JobSuggest;
