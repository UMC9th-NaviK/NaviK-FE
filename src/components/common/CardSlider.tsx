import type { ResponseKpiCard } from '../../types/card';

interface CardSliderProps {
  cards: ResponseKpiCard[];
  isLoading?: boolean;
}

const CardSlider = ({ cards, isLoading }: CardSliderProps) => {
  const handleCardClick = (cardId: number) => {
    // TODO: 클릭 시 각 카드 상세 페이지로 이동하도록 구현
    console.log(`Card with ID ${cardId} clicked`);
  };

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
        <button
          key={card.kpiCardId}
          className="flex flex-1"
          onClick={() => handleCardClick(card.kpiCardId)}
        >
          <img
            src={card.imageUrl}
            alt={`card-${card.kpiCardId}`}
            className="h-auto w-full object-cover"
          />
        </button>
      ))}
    </div>
  );
};

export default CardSlider;
