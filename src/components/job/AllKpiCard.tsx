import ResultButton from './ResultButton';

const AllKpiCard = () => {
  return (
    <div className="flex flex-col gap-8 p-4 pb-7">
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
      <ResultButton />
    </div>
  );
};

export default AllKpiCard;
