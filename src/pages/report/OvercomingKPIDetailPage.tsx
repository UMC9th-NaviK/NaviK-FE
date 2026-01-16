import ReportNavbar from '../../components/report/ReportNavbar'
import KPIComment from '../../components/report/KPIComment'
import RecommendationNotice from '../../components/report/RecommendationNotice'

const OvercomingKPIDetailPage = () => {
    return (
        <div>
            <ReportNavbar />
            <div className='flex flex-col bg-white items-center justify-center overflow-hidden'>
                <div className='flex flex-1 items-center justify-center gap-[14px] overflow-hidden'>
                    <div className='bg-[#DED6FF] w-[284px] h-[383px] rounded-[14px] overflow-hidden'></div>
                    <img 
                    src="/icons/KPIcard_1.svg"
                    className='w-[279px] h-[416.7115478515625px]'
                    />
                    <div className='bg-[#DED6FF] w-[284px] h-[383px] rounded-[14px] overflow-hidden'></div>
                </div>
                <div className='bg-[radial-gradient(circle_at_center,_rgba(222,214,255,1)_0%,_rgba(222,214,255,0)_100%)] w-full bg-white'>
                    <div className='flex flex-col pt-[32px] pb-[32px] pr-[16px] pl-[16px]'>
                        <KPIComment />
                    </div>
                    <div className='flex flex-col pr-[16px] pl-[16px] pb-[16px] gap-[10px]'>
                        <div className='flex flex-col rounded-[8px] p-[16px] gap-[16px] bg-white shadow-[0_0_10px_0_#DED6FF]'>
                            <p className='text-heading-18B text-[#1B1B1B]'> 이 KPI를 키운 실제 스터디들 🔥 </p>
                            <div className="overflow-x-auto">
                                <div className='flex flex-nowrap box-border w-full gap-[16px] snap-x snap-mandatory scrollbar-hide scroll-smooth'>
                                    <RecommendationNotice />
                                    <RecommendationNotice />
                                    <RecommendationNotice />
                                    <RecommendationNotice />
                                </div>
                            </div>
                            <div className='flex flex-col'> 
                                <p className='text-body-14B text-[#9A84FF]'> 
                                    활동을 누르면 해당 스터디로 이동해요 <br />
                                    <span className='text-body-14M text-[#454545]'> 작은 한 걸음이 곧 당신의 커리어를 바꿔요!  </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OvercomingKPIDetailPage

