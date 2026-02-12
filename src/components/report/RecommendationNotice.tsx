import { useLocation, useNavigate } from "react-router-dom";
import { ROLE_THEME_MAP } from "../../constants/roleTheme";
import { useStudyRecommend } from "../../hooks/queries/useStudyRecommend";
import type { StudyRecommendation } from "../../types/study";

interface RecommendationNoticeProps {
    role : string;
    //currentCardStudyId: number | null;
}

const RecommendationNotice = ({ role }: RecommendationNoticeProps) => {
    const location = useLocation();
    const navigate = useNavigate();

    const isOvercomingDetailPage = location.pathname.startsWith("/report/overcoming/detail");
    const theme = ROLE_THEME_MAP[role] || ROLE_THEME_MAP['pm'];

    const { data: studyList = [], isLoading } = useStudyRecommend(null, 5);

    const formatDate = (dateString: string) => {
        if (!dateString) return "일정 미정";

        const date = new Date(dateString);

        if (isNaN(date.getTime())) return "날짜 오류";

        return `${date.getMonth() + 1}월 ${date.getDate()}일`;
    };

    if (isLoading) return <div className="w-[240px] h-[250px] animate-pulse bg-gray-100 rounded-[8px]" />;

    return (
        <div className="flex flex-nowrap w-max box-border gap-[16px] scroll-smooth">
            {studyList.map((study : StudyRecommendation) => (
                <button 
                    key={study.studyId} 
                    onClick={() => navigate(`/social/study/${study.studyId}`)}
                    className={`appearance-none flex flex-shrink-0 snap-start flex-col w-[240px] bg-white border ${
                        isOvercomingDetailPage ? theme.border : "border-[#B8D4FE]"
                    } rounded-[8px] p-[16px] gap-[8px] text-left`}
                >
                    <div className="relative w-full h-[140px] rounded-lg overflow-hidden bg-[#F5F5F5]">
                        <img
                            src="/images/reports/studyExampleImages.png"
                            alt={study.title}
                            className="w-full h-full object-cover"
                        />
                        <span className='absolute top-2 right-2 px-[8px] py-[4px] rounded-[8px] border border-[#A6A6A6] text-caption-12M text-white bg-black/30 backdrop-blur-sm'>
                            {study.participationMethod}
                        </span>
                    </div>

                    <div className='flex flex-col gap-[8px] w-full'>
                        <div className='flex items-center justify-between gap-[4px]'>
                            <p className='text-body-14B text-[#111111] truncate flex-1'> 
                                {study.title} 
                            </p>
                            <p className={`text-caption-12M flex-shrink-0 ${isOvercomingDetailPage ? theme.secondaryText : "text-[#4E83F9]"}`}> 
                                ({study.participantCount}/{study.capacity}) 
                            </p>
                        </div>

                        <hr className='border-[#D6D6D6] w-full' />

                        <div className='flex items-start flex-col gap-[4px]'>
                            <p className='text-caption-12M text-[#111111CC] line-clamp-1 w-full'> 
                                {study.description} 
                            </p>
                            <p className='text-caption-12R text-[#11111199]'> 
                                {formatDate(study.startDate)} - {formatDate(study.endDate)} / {study.capacity}명 
                            </p>
                        </div>
                    </div>
                </button>
            ))}
        </div>
    );
};

export default RecommendationNotice