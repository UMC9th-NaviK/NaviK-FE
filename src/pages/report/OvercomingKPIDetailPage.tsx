import ReportNavbar from '../../components/report/ReportNavbar'
import KPIComment from '../../components/report/KPIComment'
import RecommendationNotice from '../../components/report/RecommendationNotice'
import type { Role } from '../../types/role';
import { ROLE_THEME_MAP } from '../../constants/roleTheme';
import KPICardSlider from '../../components/report/KPICardSlider';

interface OvercomingKPIDetailPageProps {
    role: Role;
}

const OvercomingKPIDetailPage = ({ role } : OvercomingKPIDetailPageProps) => {
    const theme = ROLE_THEME_MAP[role] || ROLE_THEME_MAP['pm'];

    return (
        <div>
            <ReportNavbar />
            <div className='flex flex-col bg-white items-center justify-center'>
                <KPICardSlider role='pm' />

                <div 
                className='w-full bg-white' 
                style={{ background: `radial-gradient(circle at center, ${theme.gradientVar} 0%, transparent 100%)` }}>
                    <div className='flex flex-col pt-[32px] pb-[32px] pr-[16px] pl-[16px]'>
                        <KPIComment role={'pm'} />
                    </div>
                    <div className='flex flex-col pr-[16px] pl-[16px] pb-[16px] gap-[10px]'>
                        <div className={`flex flex-col rounded-[8px] p-[16px] gap-[16px] bg-white shadow-[0_0_10px_0_${theme.primaryText}]`}>
                            <div className='flex flex-col gap-[8px]'>
                                <div 
                                className={`flex items-center w-fit shrink-0 border border-[1px] ${theme.border} bg-gradient-to-r rounded-[64px] py-[4px] px-[8px] gap-[4px]`} 
                                style={{ backgroundImage: `linear-gradient(to right, ${theme.surfaceVar}, ${theme.primaryVar})`}}>
                                    <p className='text-body-eng-14SB text-base-100'> PM </p>
                                    <p className='text-body-eng-14SB text-base-100'> 10 </p>
                                </div>

                                <p className='text-heading-18B text-[#1B1B1B]'> 보완 KPI 성장의 스터디 추천 🔥 </p>
                            </div>

                            <div className="overflow-x-auto scrollbar-hide pr-5 snap-x snap-mandatory scroll-pl-[22px]">
                                <div className='flex flex-nowrap w-max box-border gap-[16px] scroll-smooth'>
                                    <RecommendationNotice role={'pm'} />
                                    <RecommendationNotice role={'pm'} />
                                    <RecommendationNotice role={'pm'} />
                                    <RecommendationNotice role={'pm'} />

                                    <div className="flex-shrink-0 w-[1px] h-full" />
                                </div>
                            </div>

                            <div className='flex flex-col'> 
                                <p className={`text-body-14B ${theme.secondaryText}`}> 
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

