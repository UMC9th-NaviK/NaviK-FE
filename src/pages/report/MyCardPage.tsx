import { useEffect, useRef, useState } from "react";
import KPILocalNavbar from "../../components/report/KPILocalNavbar";
import KPISearchBar from "../../components/report/KPISearchBar";
import ReportNavbar from "../../components/report/ReportNavbar";

const MyCardPage = () => {
  const [cardCount] = useState(10);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(() => {
      threshold : 1
    });

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <ReportNavbar />
      <KPILocalNavbar />
      <KPISearchBar />

      <div className="flex flex-col gap-[16px] pr-[16px] pl-[16px] bg-white-background">
        <h1 className="text-heading-20B"> 핵심 역량 </h1>
        <div className="grid grid-cols-2 gap-[10px] pb-[24px]">
          {Array.from({ length: cardCount }).map((_, idx) => (
            <div
              key={idx}
              className="rounded-[12px] overflow-hidden"
            >
              <img
                src="/icons/reports/KPIcard_1.svg"
                alt="KPI 카드"
                className="w-full"
              />
            </div>
          ))}
        </div>

        <h1 className="text-heading-20B"> 극복 역량 </h1>
        <div className="grid grid-cols-2 gap-[10px] pb-[24px]">
          {Array.from({ length: cardCount }).map((_, idx) => (
            <div
              key={idx}
              className="rounded-[12px] overflow-hidden"
            >
              <img
                src="/icons/reports/KPIcard_1.svg"
                alt="KPI 카드"
                className="w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};

export default MyCardPage;
