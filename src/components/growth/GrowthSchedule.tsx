import React from 'react'

const GrowthSchedule = () => {
    return (
        <div className='flex flex-col rounded-[16px] p-[16px] gap-[10px] border-[1px] border-primary-blue-500'>
            <div className='flex flex-col gap-[5px]'>
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
