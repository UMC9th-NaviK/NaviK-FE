import { useMemo } from "react";
import type { GrowthLogMonthlyResponseResultContent } from "../../types/growth";

type Status = 'PENDING' | 'COMPLETED' | 'FAILED';

interface GrowthScheduleProps {
    logs : GrowthLogMonthlyResponseResultContent;
}

const GrowthSchedule = ({ logs } : GrowthScheduleProps) => {
const status : Status = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const target = new Date(logs.createdAt);
        target.setHours(0, 0, 0, 0);

        return target.getTime() <= today.getTime() ? 'COMPLETED' : 'PENDING';
    }, [logs.createdAt]);

    const isoDate = logs.createdAt;

    const parts = isoDate.split('-');
    const month = parts[1];
    const day = parts[2].substring(0, 2);

    const formattedDate = `${month}/${day}`;

    return (
        <div className={`flex flex-col rounded-[16px] p-[16px] gap-[10px] border-[1px] ${status === "COMPLETED" ? "border-primary-blue-100" : "border-primary-blue-500"}`}>
            <div className={`flex flex-col gap-[5px] ${status === "COMPLETED" ? "opacity-50" : "opacity-100"}`}>
                <div className='flex flex-1 items-center gap-[12px]'>
                    <div className='w-[11px] h-[11px] bg-primary-blue-500 rounded-full'> </div>
                    <p className='text-heading-20B text-base-800 truncate'> {formattedDate} </p>
                </div>

                <div className='flex flex-col gap-[2px]'>
                    <p className='text-body-16B text-primary-blue-500 truncate'> {logs.title} </p>
                    <p className='text-body-14M text-[#111111CC] truncate'> {logs.content} </p>
                </div>
            </div>
        </div>
    )  
}

export default GrowthSchedule
