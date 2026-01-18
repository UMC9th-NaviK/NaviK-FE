import { useRef, useState, useEffect } from 'react';

// TODO: 실제 카드 이미지로 교체, 데이터를 props로 받도록 수정 필요
const CARDS = [
  { id: 1, src: '/images/kpi/example.png' },
  { id: 2, src: '/images/kpi/example.png' },
  { id: 3, src: '/images/kpi/example.png' },
];

type CardSliderProps = {
  title: string;
};

const CardSlider = ({ title }: CardSliderProps) => {
  const [selectedId, setSelectedId] = useState(1);
  const [showLeftPadding, setShowLeftPadding] = useState(true);
  const [showRightPadding, setShowRightPadding] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setShowLeftPadding(scrollLeft === 0);
    setShowRightPadding(scrollLeft + clientWidth >= scrollWidth - 1);
  };

  useEffect(() => {
    handleScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCardClick = (id: number, index: number) => {
    setSelectedId(id);

    if (scrollRef.current) {
      const cardWidth = 40.5 * 16;
      const gap = 3.5 * 16;
      const scrollPosition = index * (cardWidth + gap);

      scrollRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }
  };

  const sliderPadding = `${showLeftPadding ? 'pl-4' : 'pl-0'} ${showRightPadding ? 'pr-4' : 'pr-0'}`;

  return (
    <div className="flex flex-col gap-4 pt-4">
      <p className="text-heading-20B px-4">{title}</p>
      <div
        ref={scrollRef}
        className={`scrollbar-hide flex h-60.5 items-start gap-3.5 overflow-x-auto transition-all duration-300 ${sliderPadding}`}
      >
        {CARDS.map((card, index) => {
          const isSelected = card.id === selectedId;
          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id, index)}
              className={`shrink-0 overflow-hidden rounded-2xl transition-all duration-300 ${
                isSelected ? 'z-10 h-60.5 w-40.5' : 'h-46.3 w-31 opacity-60'
              }`}
            >
              <img src={card.src} alt={`card-${card.id}`} className="h-full w-full object-cover" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CardSlider;
