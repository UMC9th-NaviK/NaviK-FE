import { useState } from 'react';
import CardNavigate from '../../components/job/CardNavigate';
import BackHeader from '../../components/common/BackHeader';
import AllKpiCard from '../../components/job/AllKpiCard';
import OvercomePower from '../../components/job/OvercomePower';
import CorePower from '../../components/job/CorePower';

const TABS = [{ component: AllKpiCard }, { component: CorePower }, { component: OvercomePower }];

const ResultPage = () => {
  const [selected, setSelected] = useState(0);
  const CurrentComponent = TABS[selected].component;

  return (
    <div className="flex min-h-screen flex-col">
      {/* TODO: 은솔 공통 컴포넌트로 변경 */}
      <BackHeader title="KPI 진단 결과" />
      <CardNavigate selected={selected} setSelected={setSelected} />
      <div className="bg-white-background flex-1">
        <CurrentComponent />
      </div>
    </div>
  );
};

export default ResultPage;
