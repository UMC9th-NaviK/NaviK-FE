import ReportNavbar from '../../components/report/ReportNavbar'
import KPIComment from '../../components/report/KPIComment'
import type { Role } from '../../types/role';
import { ROLE_THEME_MAP } from '../../constants/roleTheme';

interface CoreKPIDetailPageProps {
    role: Role;
}

const CoreKPIDetailPage = ({ role } : CoreKPIDetailPageProps) => {
    const theme = ROLE_THEME_MAP[role] || ROLE_THEME_MAP['designer'];

    /*
    // 인스타그램 공유하기 로직
    const shareToInstagramStory = () => {
        const imageUrl = encodeURIComponent(`${window.location.origin}/public/icons/KPIcard_1.svg`);

        window.location.href =
        `instagram://story-camera?backgroundImage=${imageUrl}`;
    };
    */

    return (
        <div>
            <ReportNavbar />
            <div className='flex flex-col bg-white items-center justify-center overflow-hidden'>
                <div className='flex flex-1 items-center justify-center gap-[14px]'>
                    <div className={`${theme.surfaceBg} w-[284px] h-[383px] rounded-[14px]`}> </div>
                    <img 
                    src="/icons/reports/KPIcard_2.svg"
                    alt="핵심 역량 카드"
                    className='w-[279px] h-[416.7115478515625px]'
                    />
                    <div className={`${theme.surfaceBg} w-[284px] h-[383px] rounded-[14px]`}> </div>
                </div>
                <div 
                className='flex flex-col w-full bg-white pt-[32px] pb-[32px] pr-[16px] pl-[16px] gap-[16px]'
                style={{ background: `radial-gradient(circle at center, ${theme.gradientVar} 0%, transparent 100%)` }} >
                    <KPIComment role={'designer'} />
                    <div className='flex flex-col items-center text-center justify-center border-t-[1px] border-[#E3E3E3]'>
                        <p className='text-center pt-[15px] pb-[15px] justify-center text-caption-12M text-[#111111CC]'> 노력으로 완성된 나의 독보적 역량, 자랑하러 가기 </p>
                        <button 
                        className='flex bg-black h-[48px] rounded-[8px] pt-[12px] pb-[12px] pr-[100px] pl-[100px] gap-[10px]'> 
                            <img 
                            src="/icons/reports/instagramIcon.svg"
                            alt="인스타그램 로고"
                            className=''
                            />
                            <p className='flex-1 text-body-16M text-[#F5F8FF]'> Instagram 공유 </p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CoreKPIDetailPage
