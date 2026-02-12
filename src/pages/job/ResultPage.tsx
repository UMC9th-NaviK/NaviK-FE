import { useState } from 'react';
import CardNavigate from '../../components/job/CardNavigate';
import AllKpiCard from '../../components/job/AllKpiCard';
import OvercomePower from '../../components/job/OvercomePower';
import CorePower from '../../components/job/CorePower';
import CardHeader from '../../components/common/CardHeader';
import { refreshAccessToken } from '../../apis/auth';
import { useNavigate } from 'react-router-dom';

const TABS = [{ component: AllKpiCard }, { component: CorePower }, { component: OvercomePower }];

const ResultPage = () => {
  const navigate = useNavigate();

  useState(async () => {
    try {
      const { accessToken } = await refreshAccessToken();
      localStorage.setItem('accessToken', accessToken);
      console.log('✅ Token refreshed');
    } catch (error) {
      console.error('❌ Token refresh failed:', error);
      alert('토큰 갱신에 실패했습니다. 다시 로그인해주세요.');
      navigate('/login', { replace: true });
      return;
    }
  });
  const [selected, setSelected] = useState(0);

  const CurrentComponent = TABS[selected].component;

  return (
    <div className="flex min-h-screen flex-col">
      <CardHeader />
      <CardNavigate selected={selected} setSelected={setSelected} />
      <div className="bg-white-background flex-1">
        <CurrentComponent />
      </div>
    </div>
  );
};

export default ResultPage;
