import { useState } from 'react';
import { useUser } from '../../hooks/useUser';
import { useGetCoreKpiCards, useGetOvercomeKpiCards } from '../../hooks/queries/useKpiCards';
import FlipCard from './FlipCard';

import cardBgPm from '../../assets/images/home/card-bg-pm.png';
import cardBgDesigner from '../../assets/images/home/card-bg-de.png';
import cardBgFe from '../../assets/images/home/card-bg-fe.png';
import cardBgBe from '../../assets/images/home/card-bg-be.png';

import pmBack from '../../assets/images/kpi/pm-back.png';
import designerBack from '../../assets/images/kpi/de-back.png';
import feBack from '../../assets/images/kpi/fe-back.png';
import beBack from '../../assets/images/kpi/be-back.png';

const cardBgMap: Record<string, string> = {
  pm: cardBgPm,
  designer: cardBgDesigner,
  fe: cardBgFe,
  be: cardBgBe,
};

const cardBackMap: Record<string, string> = {
  pm: pmBack,
  designer: designerBack,
  fe: feBack,
  be: beBack,
};

const KpiCard = ({ type }: { type: 'core' | 'overcome' }) => {
  const { job } = useUser();
  const { data: coreData, isFetching: isCoreFetching } = useGetCoreKpiCards();
  const { data: overcomeData, isFetching: isOvercomeFetching } = useGetOvercomeKpiCards();

  const cardsData = type === 'core' ? coreData || [] : overcomeData || [];
  const isFetching = type === 'core' ? isCoreFetching : isOvercomeFetching;

  const [isFlipped, setIsFlipped] = useState(false);
  const handleClick = () => {
    setIsFlipped((prev) => !prev);
  };

  const displayCards = cardsData.slice(0, 3);
  const cards = [displayCards[0] || null, displayCards[1] || null, displayCards[2] || null];

  const backImageUrl = cardBackMap[job || 'pm'];
  const bgImage = cardBgMap[job || 'pm'];

  // 로딩 중이거나 데이터가 없을 경우
  if (isFetching || cardsData.length === 0) {
    return (
      <div className="relative h-full">
        <img src={bgImage} className="absolute bottom-0 left-0" alt="" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center">
            <FlipCard
              backImageUrl={backImageUrl}
              isFlipped={false}
              className="z-0 -mr-6 -rotate-[8deg]"
              altText="KPI 카드 1"
            />
            <FlipCard
              backImageUrl={backImageUrl}
              isFlipped={false}
              className="z-10 -mr-6"
              altText="KPI 카드 2"
            />
            <FlipCard
              backImageUrl={backImageUrl}
              isFlipped={false}
              className="z-20 rotate-[8deg]"
              altText="KPI 카드 3"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full">
      {/* 배경 이미지 */}
      <img src={bgImage} className="absolute bottom-0 left-0" alt="" />

      {/* 카드 영역 - 전체 클릭 가능 */}
      <button onClick={handleClick} className="absolute inset-0">
        <div className="relative flex h-full items-center justify-center">
          <div className="flex items-center">
            <FlipCard
              frontImageUrl={cards[0]?.imageUrl}
              backImageUrl={backImageUrl}
              isFlipped={isFlipped}
              className="z-0 -mr-6 -rotate-[8deg]"
              altText="KPI 카드 1"
            />
            <FlipCard
              frontImageUrl={cards[1]?.imageUrl}
              backImageUrl={backImageUrl}
              isFlipped={isFlipped}
              className="z-10 -mr-6"
              altText="KPI 카드 2"
            />
            <FlipCard
              frontImageUrl={cards[2]?.imageUrl}
              backImageUrl={backImageUrl}
              isFlipped={isFlipped}
              className="z-20 rotate-[8deg]"
              altText="KPI 카드 3"
            />
          </div>
        </div>
      </button>
    </div>
  );
};

export default KpiCard;
