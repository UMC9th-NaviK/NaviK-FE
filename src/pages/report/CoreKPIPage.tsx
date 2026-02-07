import KPILocalNavbar from '../../components/report/KPILocalNavbar';
import ReportNavbar from '../../components/report/ReportNavbar';
import CardSlider from '../../components/common/CardSlider';
import { useNavigate } from 'react-router-dom';
import RecruitmentCard from '../../components/report/RecruitmentCard';
import { FOOTERPB } from '../../components/common/Footer';

const CoreKPIPage = () => {
  const navigate = useNavigate();

  const totalItems = 20;

  return (
    <div className={`${FOOTERPB}`}>
      <ReportNavbar />
      <KPILocalNavbar />

      <div className="bg-white-background flex flex-col gap-[16px] pb-[16px]">
        <CardSlider />
        <div className="flex flex-col gap-[16px] px-[16px]">
          <div className="flex flex-1 gap-[8px]">
            <img src="/icons/reports/material-symbols_highlight-mouse-cursor-rounded.svg" alt="" />
            <p className="text-heading-20B">
              {' '}
              이렇게 <span className="text-[#4E83F9]">활용</span>하면 좋아요!{' '}
            </p>
          </div>
          <div className="flex flex-col gap-[16px] rounded-[8px] bg-white py-[16px] pl-[16px] shadow-[0_0_10px_0_#DBEBFE]">
            <p className="text-heading-18B text-[#1B1B1B]">
              {' '}
              <span className="text-[#4E83F9]"> 김나비</span>님을 위한 추천 공고 💡{' '}
            </p>
            <div className="scrollbar-hide snap-x snap-mandatory scroll-pl-[18px] overflow-x-auto">
              <div className="scrollbar-hide box-border flex snap-start snap-always flex-nowrap gap-[16px] scroll-smooth">
                {Array.from({ length: totalItems }).map((_, idx) => (
                  <div key={idx} className="w-[284px] shrink-0 snap-start snap-always">
                    <RecruitmentCard />
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => navigate('/mypage/recommend')}
              className="flex flex-1 justify-end gap-[4px] pr-[16px]"
            >
              <p className="text-caption-12M text-[#11111199]"> 전체 공고 보러가기 </p>
              <img
                src="/icons/reports/material-symbols_arrow-back-ios-new-rounded.svg"
                alt=""
                className="h-[16px] w-[16px]"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoreKPIPage;
