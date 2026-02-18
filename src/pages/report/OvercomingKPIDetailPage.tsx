import ReportNavbar from '../../components/report/ReportNavbar';
import KPIComment from '../../components/report/KPIComment';
import RecommendationNotice from '../../components/report/RecommendationNotice';
import { ROLE_MAP } from '../../types/role';
import { ROLE_THEME_MAP } from '../../constants/roleTheme';
import KPICardSlider from '../../components/report/KPICardSlider';
import { useProfile } from '../../hooks/useProfile';
import { useEffect, useState } from 'react';
import { getKPICardBottom, getKPICardDetail } from '../../apis/report/kpiCard';
import type { KPICardBase, KPICardDetailResponseResult } from '../../types/kpiCard';
import { Icon } from '@iconify/react';
import { useStudyRecommend } from '../../hooks/queries/useStudyRecommend';

const OvercomingKPIDetailPage = () => {
  const { profile, role } = useProfile();
  const { data = [] } = useStudyRecommend(null, 5);

  const name = profile?.nickname as string;

  const mappedRole = ROLE_MAP[role];

  const theme = ROLE_THEME_MAP[mappedRole] || ROLE_THEME_MAP['designer'];

  const [cards, setCards] = useState<KPICardBase[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [detailData, setDetailData] = useState<KPICardDetailResponseResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [convertedValue, setConvertedValue] = useState('');

  useEffect(() => {
    const fetchInitialCards = async () => {
      try {
        const response = await getKPICardBottom();

        setCards(response.result);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchInitialCards();
  }, []);

  useEffect(() => {
    if (cards.length === 0) return;

    const currentId = cards[activeIndex].kpiCardId;

    const fetchDetail = async () => {
      try {
        const response = await getKPICardDetail(currentId, 'weak');

        setDetailData(response.result);

        if (response.result.kpiCardId % 10 !== 0) {
          setConvertedValue(`0${response.result.kpiCardId % 10}`);
        } else {
          setConvertedValue(`1${response.result.kpiCardId % 10}`);
        }
      } catch (err) {
        console.error('상세조회 실패', err);
      }
    };

    fetchDetail();
  }, [activeIndex, cards]);

  //const { data: studies = [] } = useStudyRecommend(null, 5);

  //const currentStudyId = studies.length > 0 ? studies[activeIndex].studyId : null;

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Icon
          icon="line-md:loading-twotone-loop"
          style={{ width: '40px', height: '40px' }}
          className="text-primary-blue-500"
        />
      </div>
    );
  }

  return (
    <div>
      <ReportNavbar />
      <div className="flex flex-col items-center justify-center bg-white">
        <KPICardSlider
          role={mappedRole}
          cards={cards}
          activeIndex={activeIndex}
          onIndexChange={setActiveIndex}
        />

        <div
          className="w-full bg-white"
          style={{
            background: `radial-gradient(circle at center, ${theme.gradientVar} 0%, transparent 100%)`,
          }}
        >
          <div className="flex flex-col pt-[32px] pr-[16px] pb-[32px] pl-[16px]">
            {detailData && (
              <div className="w-full">
                <KPIComment role={mappedRole} detailData={detailData} name={name} />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-[10px] pr-[16px] pb-[16px] pl-[16px]">
            <div
              className={`flex flex-col gap-[16px] rounded-[8px] bg-white p-[16px] shadow-[0_0_10px_0_${theme.primaryText}]`}
            >
              <div className="flex flex-col gap-[8px]">
                <div
                  className={`flex w-fit shrink-0 items-center border border-[1px] ${theme.border} gap-[4px] rounded-[64px] bg-gradient-to-r px-[8px] py-[4px]`}
                  style={{
                    backgroundImage: `linear-gradient(to right, ${theme.surfaceVar}, ${theme.primaryVar})`,
                  }}
                >
                  <p className="text-body-eng-14SB text-base-100"> {role} </p>
                  <p className="text-body-eng-14SB text-base-100"> {convertedValue} </p>
                </div>

                <p className="text-heading-18B text-[#1B1B1B]"> 보완 KPI 성장의 스터디 추천 🔥 </p>
              </div>

              <div className="scrollbar-hide snap-x snap-mandatory scroll-pl-[22px] overflow-x-auto pr-5">
                <div className="box-border flex w-max flex-nowrap gap-[16px] scroll-smooth">
                  {data && data.length > 0 && (
                    <RecommendationNotice role={mappedRole} study={data[0]} />
                  )}
                  <div className="h-full w-[1px] flex-shrink-0" />
                </div>
              </div>

              <div className="flex flex-col">
                <p className={`text-body-14B ${theme.secondaryText}`}>
                  활동을 누르면 해당 스터디로 이동해요 <br />
                  <span className="text-body-14M text-[#454545]">
                    {' '}
                    작은 한 걸음이 곧 당신의 커리어를 바꿔요!{' '}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OvercomingKPIDetailPage;
