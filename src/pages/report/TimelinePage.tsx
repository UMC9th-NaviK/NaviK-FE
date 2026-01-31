import GrowthChart from "../../components/growth/GrowthChart";
import GrowthSchedule from "../../components/growth/GrowthSchedule";
import ReportNavbar from "../../components/report/ReportNavbar";

const TimelinePage = () => {
  return (
    <div>
      <ReportNavbar />
      <div className="flex flex-col p-[16px] w-[375px] h-[267.151123046875px]">
        <GrowthChart width="100%" height={275} />

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
