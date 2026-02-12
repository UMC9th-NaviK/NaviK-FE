import { useLocation, useNavigate } from "react-router-dom";
import { ROLE_THEME_MAP } from "../../constants/roleTheme";
import type { Role } from "../../types/role"

interface RecommendationNoticeProps {
    role : string;
}

const RecommendationNotice = ({ role } : RecommendationNoticeProps) => {
    const location = useLocation();
    const navigate = useNavigate();

    const isOvercomingDetailPage = location.pathname.startsWith("/report/overcoming/detail");

    const theme = ROLE_THEME_MAP[role] || ROLE_THEME_MAP['pm'];

    return (
        <button 
        onClick={() => navigate("/social/study")}
        className={`appearance-none flex flex-shrink-0 snap-start snap-always flex-col w-[240px] bg-white border border-[1px] ${isOvercomingDetailPage ? `${theme.border}` : "text-[#B8D4FE]"} rounded-[8px] p-[16px] gap-[8px]`}>
            <div className="relative w-full h-[140px] rounded-lg overflow-hidden">
                <img
                src="/images/reports/studyExampleImages.png"
                alt="스터디 예시 이미지"
                className="w-full h-full object-cover bg-[#11111133]"
                />
                <span className='absolute top-2 right-2 px-[8px] py-[4px] rounded-[8px] border-[1px] border-[#A6A6A6] text-caption-12M text-white'>
                오프라인
                </span>
            </div>
            <div className='flex flex-col gap-[8px]'>
                <div className='flex flex-1 items-center gap-[4px]'>
                    <p className='text-body-14B text-[#111111]'> 스터디명 </p>
                    <p className={`text-caption-12M ${isOvercomingDetailPage ? `${theme.secondaryText}` : "text-[#B8D4FE]"}`}> (3/5) </p>
                </div>

                <hr className='text-[#D6D6D6] w-[208px]' />

                <div className='flex items-start flex-col gap-[4px]'>
                    <p className='text-caption-12M text-[#111111CC]'> 스터디에 관한 간단한 소개 </p>
                    <p className='text-caption-12R text-[#11111199]'> 1월 7일 - 1월 14일 / 5명 </p>
                </div>
            </div>
        </button>
    )
}

export default RecommendationNotice
