import KPILocalNavbar from '../../components/report/KPILocalNavbar'
import ReportNavbar from '../../components/report/ReportNavbar'
import CardSlider from '../../components/common/CardSlider'
import { useNavigate } from 'react-router-dom'
import RecruitmentCard from '../../components/report/RecruitmentCard'

const CoreKPIPage = () => {
    const navigate = useNavigate();

    const totalItems = 20;

    return (
        <div>
            <ReportNavbar />
            <KPILocalNavbar />

            <div className='flex flex-col bg-white-background gap-[32px] pb-[16px]'>
                <CardSlider title={'핵심 역량'} />
                <div className='flex flex-col px-[16px] gap-[16px]'>
                    <div className='flex flex-1 gap-[8px]'>
                        <img 
                        src="/icons/reports/material-symbols_highlight-mouse-cursor-rounded.svg"
                        alt=''
                        />
                        <p className='text-heading-20B'> 이렇게 <span className='text-[#4E83F9]'>활용</span>하면 좋아요! </p>
                    </div>
                    <div className='flex flex-col rounded-[8px] pl-[16px] py-[16px] gap-[16px] bg-white shadow-[0_0_10px_0_#DBEBFE]'>
                        <p className='text-heading-18B text-[#1B1B1B]'> <span className='text-[#4E83F9]'> 김나비</span>님을 위한 추천 공고 💡 </p>
                        <div className="overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-pl-[18px]">
                            <div className='flex flex-nowrap box-border gap-[16px] snap-start snap-always scrollbar-hide scroll-smooth'>
                                {Array.from({ length: totalItems }).map((_, idx) => (
                                <div key={idx} className="w-[284px] shrink-0 snap-start snap-always">
                                    <RecruitmentCard />
                                </div>
                                ))}
                            </div>
                        </div>

                        <button 
                        onClick={() => navigate("/mypage/recommend")}
                        className='flex flex-1 justify-end gap-[4px] pr-[16px]'> 
                            <p className='text-caption-12M text-[#11111199]'> 전체 공고 보러가기 </p>
                            <img 
                            src="/icons/reports/material-symbols_arrow-back-ios-new-rounded.svg"
                            alt=''
                            className='w-[16px] h-[16px]'
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CoreKPIPage
