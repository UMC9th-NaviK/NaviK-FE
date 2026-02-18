import { useNavigate } from 'react-router-dom';
import type { ResponseKpiCard } from '../../types/card';

interface CardSliderProps {
  cards: ResponseKpiCard[];
  isLoading?: boolean;
  type?: 'core' | 'overcome';
}

const CardSlider = ({ cards, isLoading, type }: CardSliderProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (location.pathname === '/report/core' || type === 'core') {
      navigate('/report/core/detail');
    } else if (location.pathname === '/report/overcoming' || type === 'overcome') {
      navigate('/report/overcoming/detail');
    }
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
          className="flex flex-1 cursor-pointer"
          onClick={handleCardClick}
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
