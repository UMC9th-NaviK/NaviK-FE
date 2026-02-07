// TODO: 실제 카드 이미지로 교체, 데이터를 props로 받도록 수정 필요
const CARDS = [
  { id: 1, src: '/images/kpi/example.png' },
  { id: 2, src: '/images/kpi/example.png' },
  { id: 3, src: '/images/kpi/example.png' },
];

const CardSlider = () => {
  return (
    <div className="flex gap-2 p-4">
      {CARDS.map((card) => (
        <div key={card.id} className="flex flex-1">
          <img src={card.src} alt={`card-${card.id}`} className="h-auto w-full object-cover" />
        </div>
      ))}
    </div>
  );
};

export default CardSlider;
