import { useEffect, useRef } from 'react';
import KPILocalNavbar from '../../components/report/KPILocalNavbar';
import ReportNavbar from '../../components/report/ReportNavbar';
import { FOOTERPB } from '../../components/common/Footer';
import { useGetAllKpiCards } from '../../hooks/queries/useKpiCards';

const MyCardPage = () => {
  const { data, isFetching, isLoading } = useGetAllKpiCards();

  const cards = data || [];

  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(() => {});

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`${FOOTERPB}`}>
      <ReportNavbar />
      <KPILocalNavbar />

      <div className="bg-white-background flex flex-col gap-[16px] pt-[16px] pr-[16px] pl-[16px]">
        <h1 className="text-heading-20B"> 직무 전체 역량 </h1>
        {isFetching || isLoading ? (
          <div className="flex flex-col gap-4 p-4 pb-7">
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-base-200 aspect-2/3 w-full animate-pulse rounded-lg" />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-[10px] pb-[24px]">
            {cards.map((card) => (
              <div key={card.kpiCardId} className="overflow-hidden rounded-[12px]">
                <img src={card.imageUrl} alt="KPI 카드" className="w-full" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCardPage;
