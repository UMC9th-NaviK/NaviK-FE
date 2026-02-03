import { HomeBackground } from '../../components/home/HomeBackground';

const HomePage = () => {
  return (
    <>
      <div className="relative min-h-dvh overflow-hidden">
        <HomeBackground />
        <div className="relative z-10 flex flex-col gap-4">
          <div>header</div>
          <div className="flex flex-col gap-8 px-4">
            <p className="text-heading-20B text-base-100">
              김나비님
              <br /> 커리어 항해를 시작할까요?
            </p>
            <div>강점 보완KPI 파일</div>
            <div>🔥 이번 주 HOT 게시판 </div>
            <div>김나비님을 위한 추천 공고</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
