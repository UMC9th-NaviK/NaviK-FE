import { useLocation, useNavigate } from 'react-router-dom';
import { ROLE_THEME_MAP } from '../../constants/roleTheme';
import { useStudyRecommend } from '../../hooks/queries/useStudyRecommend';
import type { StudyRecommendation } from '../../types/study';

interface RecommendationNoticeProps {
  role: string;
  //currentCardStudyId: number | null;
}

const RecommendationNotice = ({ role }: RecommendationNoticeProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isOvercomingDetailPage = location.pathname.startsWith('/report/overcoming/detail');
  const theme = ROLE_THEME_MAP[role] || ROLE_THEME_MAP['pm'];

  const { data: studyList = [], isLoading } = useStudyRecommend(null, 5);

  const formatDate = (dateString: string) => {
    if (!dateString) return '일정 미정';

    const date = new Date(dateString);

    if (isNaN(date.getTime())) return '날짜 오류';

    return `${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  if (isLoading)
    return <div className="h-[250px] w-[240px] animate-pulse rounded-[8px] bg-gray-100" />;

  return (
    <div className="box-border flex w-max flex-nowrap gap-[16px] scroll-smooth">
      {studyList.map((study: StudyRecommendation) => (
        <button
          key={study.studyId}
          onClick={() => navigate(`/social/study`)}
          className={`flex w-[240px] flex-shrink-0 snap-start appearance-none flex-col border bg-white ${
            isOvercomingDetailPage ? theme.border : 'border-[#B8D4FE]'
          } gap-[8px] rounded-[8px] p-[16px] text-left`}
        >
          <div className="relative h-[140px] w-full overflow-hidden rounded-lg bg-[#F5F5F5]">
            <img
              src="/images/reports/studyExampleImages.png"
              alt={study.title}
              className="h-full w-full object-cover"
            />
            <span className="text-caption-12M absolute top-2 right-2 rounded-[8px] border border-[#A6A6A6] bg-black/30 px-[8px] py-[4px] text-white backdrop-blur-sm">
              {study.participationMethod}
            </span>
          </div>

          <div className="flex w-full flex-col gap-[8px]">
            <div className="flex items-center justify-between gap-[4px]">
              <p className="text-body-14B flex-1 truncate text-[#111111]">{study.title}</p>
              <p
                className={`text-caption-12M flex-shrink-0 ${isOvercomingDetailPage ? theme.secondaryText : 'text-[#4E83F9]'}`}
              >
                ({study.participantCount}/{study.capacity})
              </p>
            </div>

            <hr className="w-full border-[#D6D6D6]" />

            <div className="flex flex-col items-start gap-[4px]">
              <p className="text-caption-12M line-clamp-1 w-full text-[#111111CC]">
                {study.description}
              </p>
              <p className="text-caption-12R text-[#11111199]">
                {formatDate(study.startDate)} - {formatDate(study.endDate)} / {study.capacity}명
              </p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default RecommendationNotice;
