import KPILocalNavbar from '../../components/report/KPILocalNavbar';
import ReportNavbar from '../../components/report/ReportNavbar';
import CardSlider from '../../components/common/CardSlider';
import RecommendationNotice from '../../components/report/RecommendationNotice';
import { FOOTERPB } from '../../components/common/Footer';
import { useGetOvercomeKpiCards } from '../../hooks/queries/useKpiCards';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { useRef } from 'react';
import { useStudyRecommend } from '../../hooks/queries/useStudyRecommend';
import { ROLE_MAP } from '../../types/role';

const OvercomingKPIPage = () => {
  const { name } = useUser();
  const { data, isFetching } = useGetOvercomeKpiCards();
  const cards = data || [];
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data: studyData, isLoading } = useStudyRecommend(null, 5);
  const { job } = useUser();
  const mappedRole = ROLE_MAP[job || 'pm'];

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
          <div className="flex flex-col gap-[16px] rounded-[8px] bg-white py-4 shadow-[0_0_10px_0_#DBEBFE]">
            <p className="text-heading-18B text-[#1B1B1B]">
              <span className="pl-4 text-[#4E83F9]"> 📚{name || '사용자'}</span>님을 위한 추천
              스터디 📚
            </p>
            <div className="flex flex-col gap-3">
              <div
                ref={scrollRef}
                className="scrollbar-hide mx-4 flex snap-x snap-mandatory flex-nowrap gap-4 overflow-x-auto scroll-smooth"
              >
                {isLoading ? (
                  <div className="flex w-full animate-pulse">
                    <div className="h-[250px] w-full rounded-[8px] bg-gray-100" />
                  </div>
                ) : (
                  <>
                    {studyData && studyData.length > 0 ? (
                      studyData.map((study, idx) => (
                        <div key={idx} className="flex-none snap-center">
                          <RecommendationNotice role={mappedRole} study={study} />
                        </div>
                      ))
                    ) : (
                      <div className="flex w-full items-center justify-center py-4">
                        <p className="text-caption-12M text-gray-500">추천 스터디가 없습니다.</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="flex flex-1 justify-end gap-[4px]">
              <button
                onClick={() => navigate(`/social/study`)}
                className="text-caption-12M cursor-pointer text-[#11111199]"
              >
                전체 스터디 보러가기
              </button>
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
