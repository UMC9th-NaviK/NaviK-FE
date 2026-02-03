import { useState } from 'react';

const CardHeader = () => {
  const [clickInfo, setClickInfo] = useState(false);

  const onInfoClick = () => {
    setClickInfo(!clickInfo);
  };

  return (
    <div className="relative flex w-full items-center justify-between px-6 pt-6 pb-4">
      <p className="text-heading-20B text-base-900">KPI 진단 결과</p>
      <button onClick={onInfoClick} className="z-20">
        <img src="/icons/reports/info.svg" className="h-6 w-6" />
      </button>
      {clickInfo && (
        <div className="absolute top-8 -right-2 z-10 w-60 overflow-hidden">
          <img src="/images/infoText.png" />
        </div>
      )}
    </div>
  );
};

export default CardHeader;
