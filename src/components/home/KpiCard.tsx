import { useState } from 'react';

const KpiCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <div className="relative h-full">
      {/* 배경 이미지 */}
      <img src="/images/home/card-bg-pm.png" className="absolute bottom-0 left-0" alt="" />

      {/* 카드 영역 - 전체 클릭 가능 */}
      {/* TODO: 서서히 바뀌기 */}
      <button onClick={handleClick} className="absolute inset-0">
        <div className="relative flex h-full items-center justify-center">
          <div className="flex items-center">
            <div className="z-0 -mr-8 w-25 shrink-0 -rotate-[8deg] transition-transform duration-300">
              <img
                src={`/images/kpi/pm-${isFlipped ? 'front' : 'back'}.png`}
                alt="KPI 카드 1"
                className="w-full"
              />
            </div>
            <div className="z-10 -mr-8 w-25 shrink-0 transition-transform duration-300">
              <img
                src={`/images/kpi/pm-${isFlipped ? 'front' : 'back'}.png`}
                alt="KPI 카드 2"
                className="w-full"
              />
            </div>
            <div className="z-20 w-25 shrink-0 rotate-[8deg] transition-transform duration-300">
              <img
                src={`/images/kpi/pm-${isFlipped ? 'front' : 'back'}.png`}
                alt="KPI 카드 3"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default KpiCard;
