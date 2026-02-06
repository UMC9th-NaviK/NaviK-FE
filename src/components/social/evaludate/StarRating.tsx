import { Icon } from '@iconify/react';
import { useRef } from 'react';

interface StarRatingProps {
  rating: number;
  setRating: (rating: number) => void;
}

export const StarRating = ({ rating, setRating }: StarRatingProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleStarMove = (clientX: number) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const x = clientX - left;

    const percent = x / width;
    let newRating = Math.ceil(percent * 10) / 2;

    if (newRating < 0.5) newRating = 0;
    newRating = Math.max(0, Math.min(5, newRating));

    setRating(newRating);
  };

  return (
    <div
      ref={containerRef}
      className="border-primary-blue-200 flex h-14 w-full cursor-pointer touch-none items-center justify-center gap-1 rounded-lg border bg-white"
      onMouseMove={(e) => {
        if (e.buttons === 1) handleStarMove(e.clientX);
      }}
      onTouchMove={(e) => handleStarMove(e.touches[0].clientX)}
      onClick={(e) => handleStarMove(e.clientX)}
    >
      {[1, 2, 3, 4, 5].map((num) => {
        let iconName = 'material-symbols:star-outline-rounded';
        let colorClass = 'text-base-200';

        if (num <= rating) {
          // 꽉 찬 별
          iconName = 'material-symbols:star-rounded';
          colorClass = 'text-primary-blue-500';
        } else if (num - 0.5 === rating) {
          // 반 별
          iconName = 'material-symbols:star-half-rounded';
          colorClass = 'text-primary-blue-500';
        }

        return (
          <div key={num} className="pointer-events-none transition-transform active:scale-110">
            <Icon icon={iconName} className={`text-4xl ${colorClass}`} />
          </div>
        );
      })}
    </div>
  );
};
