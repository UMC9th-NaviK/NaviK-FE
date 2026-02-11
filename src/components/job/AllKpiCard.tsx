import { useGetAllKpiCards } from '../../hooks/queries/useKpiCards';
import ResultButton from './ResultButton';

const AllKpiCard = () => {
  const { data, isFetching, isLoading } = useGetAllKpiCards();

  const cards = data || [];

  if (isFetching || isLoading) {
    return (
      <div className="flex flex-col gap-4 p-4 pb-7">
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-base-200 aspect-2/3 w-full animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4 pb-7">
      {/* 전체 카드 리스트 */}
      <div className="grid grid-cols-2 gap-4">
        {cards.map((card) => (
          <img
            key={card.kpiCardId}
            src={card.imageUrl}
            alt={`KPI 카드 ${card.kpiCardId}`}
            className="aspect-2/3 w-full rounded-lg object-cover"
            loading="eager"
          />
        ))}
      </div>
      <ResultButton />
    </div>
  );
};

export default AllKpiCard;
