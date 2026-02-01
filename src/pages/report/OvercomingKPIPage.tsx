import KPILocalNavbar from '../../components/report/KPILocalNavbar'
import ReportNavbar from '../../components/report/ReportNavbar'
import KPISearchBar from '../../components/report/KPISearchBar'
import CardSlider from '../../components/common/CardSlider'
import RecommendationNotice from '../../components/report/RecommendationNotice'

const OvercomingKPIPage = () => {
    return (
        <div>
            <ReportNavbar />
            <KPILocalNavbar />

            <div className='flex flex-col bg-white-background gap-[32px] pb-[16px]'>
                <CardSlider title={'극복 역량'} />

                <div className='flex flex-col px-[16px] gap-[16px]'>
                    <div className='flex flex-1 gap-[8px]'>
                        <img 
                        src="/icons/reports/Vector.svg"
                        alt="vector"
                        />
                        <p className='text-heading-20B'> 이렇게 <span className='text-[#4E83F9]'>극복</span>하는 건 어때요? </p>
                    </div>
                    <div className='flex flex-col rounded-[8px] p-[16px] gap-[16px] bg-white shadow-[0_0_10px_0_#DBEBFE]'>
                        <p className='text-heading-18B text-[#1B1B1B]'> <span className='text-[#4E83F9]'> 김나비</span>님을 위한 추천 스터디 📚 </p>
                        <div className="overflow-x-auto">
                            <div className='flex flex-nowrap box-border w-full gap-[16px] snap-x snap-mandatory scrollbar-hide scroll-smooth'>
                                <RecommendationNotice role={'pm'} />
                                <RecommendationNotice role={'pm'} />
                                <RecommendationNotice role={'pm'} />
                                <RecommendationNotice role={'pm'} />
                            </div>
                        </div>
                        <div className='flex flex-1 justify-end gap-[4px]'> 
                            <p className='text-caption-12M text-[#11111199]'> 전체 스터디 보러가기 </p>
                            <img 
                            src="/icons/reports/material-symbols_arrow-back-ios-new-rounded.svg"
                            alt=""
                            className='w-[16px] h-[16px]'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OvercomingKPIPage
