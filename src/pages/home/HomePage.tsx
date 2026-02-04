import { HomeBackground } from '../../components/home/HomeBackground';
import HomeHeader from '../../components/home/HomeHeader';
import HomeJobSuggest from '../../components/home/HomeJobSuggest';
import HotBoardSection from '../../components/home/HotBoardSection';
import KpiFile from '../../components/home/KpiFile';

const HomePage = () => {
  return (
    <>
      <div className="relative min-h-dvh overflow-hidden">
        <HomeBackground />
        <div className="relative z-10 flex flex-col gap-4 pb-40.5">
          <HomeHeader />
          <div className="flex flex-col gap-8">
            <p className="text-heading-20B text-base-100 px-4">
              김나비님
              <br /> 커리어 항해를 시작할까요?
            </p>
            <KpiFile />
            <HotBoardSection />
            <HomeJobSuggest />
          </div>
        </div>
        {/* 아래 파도 이미지 및 푸터 첨부 */}
      </div>
    </>
  );
};

export default HomePage;
