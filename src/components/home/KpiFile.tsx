import { useState } from 'react';
import KpiCard from './KpiCard';

type KPITab = 'core' | 'overcome';

const KpiFile = () => {
  const [activeTab, setActiveTab] = useState<KPITab>('core');

  const getTabButtonClass = (tab: KPITab, position: 'left' | 'right') =>
    `absolute top-0 ${position}-0 flex h-12.5 w-[50%] justify-center ` +
    (activeTab === tab
      ? 'text-heading-18B text-base-100 pt-3'
      : 'text-body-16M text-base-100/80 pt-2.5');

  return (
    <div className="relative px-4">
      {/* 배경 폴더 이미지 */}
      <div className="relative w-full" style={{ aspectRatio: '343 / 278' }}>
        <img
          src={`/images/home/folder-${activeTab}.png`}
          alt="KPI Folder"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* 클릭 영역 */}
        <button
          onClick={() => setActiveTab('core')}
          className={getTabButtonClass('core', 'left')}
          aria-label="강점 KPI"
        >
          강점 KPI
        </button>
        <button
          onClick={() => setActiveTab('overcome')}
          className={getTabButtonClass('overcome', 'right')}
          aria-label="보완 KPI"
        >
          보완 KPI
        </button>

        {/* 카드 영역 */}
        <div
          className="absolute overflow-hidden"
          style={{
            left: '4.37%',
            right: '4.37%',
            top: '21.22%',
            bottom: '9.35%',
          }}
        >
          <div className="h-full">
            <KpiCard type={activeTab} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default KpiFile;
