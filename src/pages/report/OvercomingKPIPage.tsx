import KPILocalNavbar from '../../components/report/KPILocalNavbar';
import ReportNavbar from '../../components/report/ReportNavbar';
import CardSlider from '../../components/common/CardSlider';
import RecommendationNotice from '../../components/report/RecommendationNotice';
import { FOOTERPB } from '../../components/common/Footer';
import { useGetOvercomeKpiCards } from '../../hooks/queries/useKpiCards';

const OvercomingKPIPage = () => {
  const { data, isFetching } = useGetOvercomeKpiCards();
  const cards = data || [];

  return (
    <div className={`${FOOTERPB} flex min-h-screen flex-col`}>
      <ReportNavbar />
      <KPILocalNavbar />

      <div className="bg-white-background flex flex-1 flex-col gap-[16px] pb-[16px]">
        <CardSlider cards={cards} isLoading={isFetching} />

        <div className="flex flex-col gap-[16px] px-[16px]">
          <div className="flex flex-1 gap-[8px]">
            <img src="/icons/reports/Vector.svg" alt="vector" />
            <p className="text-heading-20B">
              {' '}
              이렇게 <span className="text-[#4E83F9]">극복</span>하는 건 어때요?{' '}
            </p>
          </div>
          <div className="flex flex-col gap-[16px] rounded-[8px] bg-white p-[16px] shadow-[0_0_10px_0_#DBEBFE]">
            <p className="text-heading-18B text-[#1B1B1B]">
              {' '}
              <span className="text-[#4E83F9]"> 김나비</span>님을 위한 추천 스터디 📚{' '}
            </p>
            <div className="scrollbar-hide snap-x snap-mandatory scroll-pl-[22px] overflow-x-auto pr-5">
              <div className="box-border flex w-max flex-nowrap gap-[16px] scroll-smooth">
                <RecommendationNotice role={'pm'} />
                <RecommendationNotice role={'pm'} />
                <RecommendationNotice role={'pm'} />
                <RecommendationNotice role={'pm'} />

                <div className="h-full w-[1px] flex-shrink-0" />
              </div>
            </div>

            <div className="flex flex-1 justify-end gap-[4px]">
              <p className="text-caption-12M text-[#11111199]"> 전체 스터디 보러가기 </p>
              <img
                src="/icons/reports/material-symbols_arrow-back-ios-new-rounded.svg"
                alt=""
                className="h-[16px] w-[16px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OvercomingKPIPage;
