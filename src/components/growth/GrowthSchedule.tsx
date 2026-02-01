import { useEffect, useState } from "react";

type Status = 'expired' | 'deadline';

const GrowthSchedule = () => {
    const [status, setStatus] = useState<Status>('deadline');

    const deadlineDate = new Date(2026, 1, 30);

    useEffect(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const target = new Date(deadlineDate);
        target.setHours(0, 0, 0, 0);
    
        const diffMs = target.getTime() - today.getTime();
        const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    
        if (diffDays < 0) {
            setStatus("expired"); 
        } else  {
            setStatus("deadline");
        } 
    }, [deadlineDate]);

    return (
        <div className={`flex flex-col rounded-[16px] p-[16px] gap-[10px] border-[1px] ${status === "expired" ? "border-primary-blue-100" : "border-primary-blue-500"}`}>
            <div className={`flex flex-col gap-[5px] ${status === "expired" ? "opacity-50" : "opacity-100"}`}>
                <div className='flex flex-1 items-center gap-[12px]'>
                    <div className='w-[11px] h-[11px] bg-primary-blue-500 rounded-full'>  </div>
                    <p className='text-heading-20B text-base-800'> 11/11 </p>
                </div>

                <div className='flex flex-col gap-[2px]'>
                    <p className='text-body-16B text-primary-blue-500'> ‘DB 스터디’ 2회차 참여 </p>
                    <p className='text-body-14M text-[#111111CC]'> 피드백: 1:N 관계 표현, 정규화 잘함 </p>
                </div>
            </div>
        </div>
    )  
}

export default GrowthSchedule
