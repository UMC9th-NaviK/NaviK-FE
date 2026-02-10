import type { ResponseKpiCard } from '../../types/card';

interface CardSliderProps {
  cards: ResponseKpiCard[];
  isLoading?: boolean;
}

const CardSlider = ({ cards, isLoading }: CardSliderProps) => {
  if (isLoading) {
    return (
      <div className="flex gap-2 p-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-base-200 aspect-2/3 w-full animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-2 p-4">
      {cards.map((card) => (
        <div key={card.kpiCardId} className="flex flex-1">
          <img
            src={card.imageUrl}
            alt={`card-${card.kpiCardId}`}
            className="h-auto w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default CardSlider;
