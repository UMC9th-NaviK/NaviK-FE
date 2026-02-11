import { useQuery } from "@tanstack/react-query";
import { FOOTERPB } from "../../components/common/Footer";
import GrowthChart from "../../components/growth/GrowthChart";
import GrowthSchedule from "../../components/growth/GrowthSchedule";
import ReportNavbar from "../../components/report/ReportNavbar";
import { getGrowthLogMonthly } from "../../apis/growth/growth";
import { useState } from "react";

const TimelinePage = () => {
  const [yearMonth] = useState("2026-02");
  const [type] = useState("USER_INPUT");

  const { data } = useQuery({
      queryKey: ['growthLogsMonthly', yearMonth, type],
      queryFn: () => getGrowthLogMonthly(yearMonth, type, 0, 20),
  });

  const logs = data?.result?.content || [];

  return (
    <div className={`flex flex-col h-screen overflow-hidden ${FOOTERPB}`}>
      <div className="flex-shrink-0">
        <ReportNavbar />
      </div>

      <div className="flex-1 flex flex-col min-h-0 px-[16px]">
        <div className="z-10 bg-white flex-shrink-0 h-[267px]">
          <GrowthChart width="100%" height="100%" unit={"MONTH"} type={"USER_INPUT"} />
        </div>

        <div className="flex-1 overflow-y-auto pb-[16px] scrollbar-hide">
          <div className="flex flex-col gap-[16px]">
            {logs?.map((log) => (
              <GrowthSchedule key={log.growthLogId} logs={log} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
};

export default TimelinePage;