import { useState, useEffect } from 'react'; // useEffect 추가
import CardNavigate from '../../components/job/CardNavigate';
import BackHeader from '../../components/common/BackHeader';
import AllKpiCard from '../../components/job/AllKpiCard';
import OvercomePower from '../../components/job/OvercomePower';
import CorePower from '../../components/job/CorePower';
import { getRecruitments } from '../../apis/recruit';
import type { Recruitment } from '../../types/recruits';

const TABS = [{ component: AllKpiCard }, { component: CorePower }, { component: OvercomePower }];

const ResultPage = () => {
  const [selected, setSelected] = useState(0);
  const [recruitments, setRecruitments] = useState<Recruitment[]>([]);

  // 페이지 진입 시 공고 데이터 로드
  useEffect(() => {
    const fetchRecruitments = async () => {
      try {
        const data = await getRecruitments();
        setRecruitments(data);
        console.log(data);
      } catch (error) {
        console.error('공고 로딩 실패:', error);
      }
    };
    fetchRecruitments();
  }, []);

  const CurrentComponent = TABS[selected].component;

  return (
    <div className="flex min-h-screen flex-col">
      <BackHeader title="KPI 진단 결과" />
      <CardNavigate selected={selected} setSelected={setSelected} />
      <div className="bg-white-background flex-1">
        <CurrentComponent recruitments={recruitments} />
      </div>
    </div>
  );
};

export default ResultPage;
