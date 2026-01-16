const AllKpiCard = () => {
  return (
    <div className="flex flex-col gap-4 p-4 pb-7">
      {/* 전체 카드 리스트 */}
      <div className="grid grid-cols-2 gap-4">
        {/* 카드 20개 반복 */}
        {[...Array(20)].map((_, index) => (
          <img
            key={index}
            src="/images/kpi/example.png"
            alt={`KPI 카드 ${index + 1}`}
            className="aspect-2/3 w-full object-cover"
          />
        ))}
      </div>
      <div className="bg-base-200 text-base-500 text-caption-12M flex items-center gap-1 rounded-lg px-4 py-3">
        <img src="/icons/warning.svg" className="h-3.5 w-3.5" />
        <p>AI 검사 결과 유의사항</p>
      </div>
    </div>
  );
};

export default AllKpiCard;
