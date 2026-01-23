const StudySuggest = () => {
  return (
    <div className="bg-base-100 shadow-card gap-4 rounded-2xl py-4">
      <p className="text-heading-20B text-base-900 flex px-4">
        <span className="text-primary-blue-500">김나비</span>
        님을 위한 추천 스터디📚
      </p>
      <div className="flex flex-col gap-3">
        {/* TODO: 스터디 컴포넌트 슬라이더 */}
        <button className="text-opacity-black-60 text-caption-12M flex items-center gap-1 self-end">
          전체 스터디 보러가기
          <img src="/icons/reports/arrow-right-gray.svg" className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default StudySuggest;
