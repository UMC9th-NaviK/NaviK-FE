import { useState } from 'react';
import CardNavigate from '../../components/job/CardNavigate';
import BackHeader from '../onboarding/BackHeader';
import AllKpiCard from '../../components/job/AllKpiCard';
import OvercomePower from '../../components/job/OvercomePower';
import CorePower from '../../components/job/CorePower';

const TABS = [{ component: AllKpiCard }, { component: CorePower }, { component: OvercomePower }];

const ResultPage = () => {
  const [selected, setSelected] = useState(0);
  const CurrentComponent = TABS[selected].component;

  return (
    <>
      <BackHeader title="KPI 진단 결과" />
      <CardNavigate selected={selected} setSelected={setSelected} />
      <div className="bg-white-background px-2.5 py-4">
        <CurrentComponent />
      </div>
    </>
  );
};

export default ResultPage;
