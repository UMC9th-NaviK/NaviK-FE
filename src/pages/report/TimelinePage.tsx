import { FOOTERPB } from "../../components/common/Footer";
import GrowthChart from "../../components/growth/GrowthChart";
import GrowthSchedule from "../../components/growth/GrowthSchedule";
import ReportNavbar from "../../components/report/ReportNavbar";

const TimelinePage = () => {
  return (
    <div className={`${FOOTERPB}`}>
      <ReportNavbar />
      <div className="flex flex-col p-[16px] w-full h-[267.151123046875px]">
        <GrowthChart width="100%" height="100%" />

        <div className="flex flex-col pt-[8px] pb-[16px] gap-[16px]">
          <GrowthSchedule />
          <GrowthSchedule />
          <GrowthSchedule />
        </div>
      </div>
    </div>
  )
};

export default TimelinePage;
