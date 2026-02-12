import { useRecruitments } from '../../hooks/useRecruitments'; // 커스텀 훅 임포트
import Footer from '../../components/common/Footer';
import { HomeBackground } from '../../components/home/HomeBackground';
import HomeHeader from '../../components/home/HomeHeader';
import HomeJobSuggest from '../../components/home/HomeJobSuggest';
import HotBoardSection from '../../components/home/HotBoardSection';
import KpiFile from '../../components/home/KpiFile';
import { useUser } from '../../hooks/useUser';
import { useEffect } from 'react';
import { syncUserProfile } from '../../apis/auth';

const HomePage = () => {
  useEffect(() => {
    syncUserProfile();
  }, []);

  const { recruitments } = useRecruitments();
  const { name } = useUser();

  return (
    <>
      <div className="relative min-h-dvh overflow-hidden">
        <HomeBackground />
        <div className="relative z-10 flex flex-col gap-4 pb-40.5">
          <HomeHeader />
          <div className="flex flex-col gap-8">
            <p className="text-heading-20B text-base-100 px-4">
              {name || '사용자'}님
              <br /> 커리어 항해를 시작할까요?
            </p>
            <KpiFile />
            <HotBoardSection />

            <HomeJobSuggest recruitments={recruitments} />
          </div>
        </div>
        <img src="/images/home/wave.svg" alt="" className="absolute bottom-8 left-0 z-1 w-full" />
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
