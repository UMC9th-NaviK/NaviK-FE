import ReportNavbar from '../../components/report/ReportNavbar'
import KPIComment from '../../components/report/KPIComment'
import type { Role } from '../../types/role';
import { ROLE_THEME_MAP } from '../../constants/roleTheme';
import KPICardSlider from '../../components/report/KPICardSlider';

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
            <div className='flex flex-col bg-white items-center justify-center'>
                <KPICardSlider role={'designer'} />
                
                <div 
                className='flex flex-col w-full bg-white pt-[32px] pb-[32px] pr-[16px] pl-[16px] gap-[16px]'
                style={{ background: `radial-gradient(circle at center, ${theme.gradientVar} 0%, transparent 100%)` }} >
                    <KPIComment role={'designer'} />
                    <div className='flex flex-col items-center text-center justify-center border-t-[1px] border-[#E3E3E3]'>
                        <p className='text-center pt-[15px] pb-[15px] justify-center text-caption-12M text-[#111111CC]'> 노력으로 성장한 나의 독보적인 강점 역량, 친구들에게 전달할까요? </p>
                        <button 
                        className='flex bg-[linear-gradient(91.12deg,_#4F5BD5_0%,_#962FBF_25%,_#D62976_50%,_#FA7E1E_75%,_#FEDA75_100%)] h-[48px] rounded-[8px] pt-[12px] pb-[12px] pr-[100px] pl-[100px] gap-[10px]'> 
                            <img 
                            src="/icons/reports/icon-park-outline_send.svg"
                            alt="인스타그램 바로가기"
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
