import { useNavigate } from 'react-router-dom';
import ComparisonIncrease from '../../components/report/ComparisonIncrease';
import profileImage from '../../assets/images/profile.png';
import { FOOTERPB } from '../../components/common/Footer';
import { useState, useEffect } from 'react';
import { useLevel } from '../../hooks/queries/useLevel';
import { useGoals } from '../../hooks/goals/useGoals';
import { useKPIScoreMonthly } from '../../hooks/queries/useKPIScore';
import { useMyPage } from '../../hooks/useMyPage';

const ReportMainPage = () => {
  const navigate = useNavigate();

  const ROLE_MAP: Record<string, string> = {
    '프로덕트 매니저': 'PM',
    '프로덕트 디자이너': 'DESIGNER',
    '프론트엔드 개발자': 'FE',
    '백엔드 개발자': 'BE',
  };

  const { profile } = useMyPage();

  const mappedRole = ROLE_MAP[profile?.job || '프로덕트 매니저'];

  const { data } = useLevel();
  const { goalsList } = useGoals(100, 'RECENT');
  const { data: monthlyScoreData } = useKPIScoreMonthly();

  const topThreeGoals = goalsList.slice(0, 3);
  const progressGoalsCount = goalsList.filter((goal) => goal.status === 'IN_PROGRESS').length;

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;

  const [type, setType] = useState('up');
  const [scoreRate, setScoreRate] = useState(0);

  useEffect(() => {
    if (monthlyScoreData?.changeRate !== undefined && monthlyScoreData?.changeRate !== null) {
      if (monthlyScoreData.changeRate < 0) {
        setType('down');
        setScoreRate(monthlyScoreData.changeRate);
      } else {
        setType('up');
        setScoreRate(monthlyScoreData.changeRate);
      }
    }
  }, [monthlyScoreData?.changeRate]);

  return (
    <div
      className={`bg-white-background flex min-h-screen w-full flex-col bg-[radial-gradient(circle,_#94BBFD_0%,_rgba(184,212,254,0)_100%)] ${FOOTERPB}`}
    >
      <header className="pt-[16px] pr-[24px] pb-[24px] pl-[24px]">
        <h1 className="text-heading-24B"> 리포트 </h1>
      </header>

      <div className="flex pr-[16px] pl-[16px]">
        <div className="relative flex flex-1 items-center gap-[10px] overflow-hidden rounded-full bg-white p-[10px] shadow-[0_0_10px_0_#DBEBFE]">
          <div className="flex h-[65px] w-[65px] items-center justify-center rounded-full bg-[conic-gradient(from_0deg,#4E83F9,#DBEBFE)]">
            <img
              src={profile?.profileImageUrl || profileImage}
              alt="프로필 이미지"
              className="flex h-[55px] w-[55px] items-center justify-center rounded-full bg-white"
            />
          </div>

          <img
            src="/icons/reports/profileCompass.svg"
            alt="프로필 나침반 아이콘"
            className="absolute top-[px] right-[10px] z-0 h-[100px] w-[100px] rotate-[0deg] blur-[0.8px]"
          />

          <div className="flex-col items-center justify-center">
            <span className="text-heading-18B">{profile?.nickname || profile?.name} 님,</span>

            <div className="flex">
              <span className="text-body-16B text-[#4E83F9]">{mappedRole}</span>
              <p className="text-body-16B">의 성공적인 항해를 위해서🔥</p>
            </div>
          </div>
        </div>
      </div>

      <main className="flex flex-col items-center gap-[16px] pt-[20px] pr-[16px] pb-[20px] pl-[16px]">
        <div className="flex w-full flex-1 items-center justify-center gap-[16px]">
          <div className="flex w-[50%] flex-col gap-[16px]">
            <button
              onClick={() => navigate('/report/core')}
              className="relative flex h-[111px] items-start justify-start overflow-hidden rounded-[7px] bg-gradient-to-b from-[#79A6FB] to-[#3964D6] p-4"
            >
              <p className="text-heading-20B relative z-10 h-full text-left text-white">
                {' '}
                내 카드 <br /> 보러가기{' '}
              </p>
              <img
                src="/images/reports/goingMyCard.png"
                alt=""
                className="absolute right-[-10px] bottom-[-10px] z-0 h-[130px] w-[120px] p-[10px] opacity-70"
              />
            </button>

            <button
              onClick={() => navigate('/social/evaluation')}
              className="relative flex h-[111px] flex-col gap-[5px] rounded-[7px] bg-white p-4"
            >
              <p className="text-heading-20B relative z-10 text-left text-black"> 동료 피드백 </p>
              <p className="text-body-14M relative z-10 text-left">
                {' '}
                <span className="text-[#4E83F9]">협업 커뮤니케이션</span>이 <br /> 뛰어나요👍🏻{' '}
              </p>
              <img
                src="/images/reports/colleagueFeedback.png"
                alt=""
                className="absolute right-[0px] bottom-[0px] z-0 h-[120px] w-[120px]"
              />
            </button>
          </div>

          <button
            onClick={() => navigate('/goals')}
            className="flex h-[238px] w-[50%] flex-col gap-[32px] rounded-[7px] border-[0.5px] border-white bg-[rgba(255,255,255,0.5)] p-4 pt-[8px] pr-[16px] pb-[8px] pl-[16px]"
          >
            <div className="flex h-full flex-col gap-[10px]">
              <div className="flex flex-1 items-center justify-between">
                <p className="text-heading-20B text-black"> 목표 설정 </p>
              </div>

              <div
                className={`text-body-14M flex h-full flex-col ${topThreeGoals.length === 0 ? 'justify-center' : 'justify-start'} gap-[8px] text-center`}
              >
                {topThreeGoals.length === 0 ? (
                  <p className="text-body-14M text-[#11111166]">목표를 설정해주세요. </p>
                ) : (
                  <>
                    {topThreeGoals.map((goal) => (
                      <p
                        key={goal.id}
                        className={`${goal.status === 'IN_PROGRESS' ? 'bg-primary-blue-500 text-white' : 'bg-white text-[#0E2277]'} rounded-[5px] p-[8px]`}
                      >
                        {goal.title}
                      </p>
                    ))}
                  </>
                )}
              </div>
            </div>

            <div className="flex flex-1 items-end justify-between">
              <p className="text-body-16M text-black"> 완료할 목표 </p>
              <span className="text-heading-20B text-[#4E83F9]"> {progressGoalsCount} 개 </span>
            </div>
          </button>
        </div>

        <div className="flex h-[274px] w-full rounded-[7px] border-[0.5px] border-white bg-[rgba(255,255,255,0.5)] p-4">
          <div className="flex w-full flex-col gap-[14px]">
            <p className="text-heading-20B text-black"> 성장 로그 </p>
            <div className="flex w-full flex-1 justify-between gap-[7px]">
              <button
                onClick={() => navigate('/report/growth')}
                className="relative flex w-[62%] flex-col gap-[58px] overflow-hidden rounded-[7px] bg-white pt-[11px] pr-[12px] pb-[11px] pl-[12px]"
              >
                <div className="relative z-10 flex flex-col items-start">
                  <p className="text-body-16B z-10"> 직무 레벨 배지 </p>
                  <span className="text-heading-24B relative z-10 text-[#4E83F9]">
                    {' '}
                    LV. {data?.levelValue}{' '}
                  </span>
                  <img
                    src="/images/reports/levelBadge.png"
                    alt=""
                    className="absolute right-[-22px] bottom-[-75px] z-0 h-[140px] w-[120px] p-[10px]"
                  />
                </div>
                {type === 'up' ? (
                  <p className="text-body-14M absolute bottom-0 pb-[12px] text-start text-[#11111199]">
                    {' '}
                    지난 달 대비 <br />{' '}
                    <span className="text-body-16M text-[#4E83F9]"> {scoreRate}% </span>{' '}
                    상승했어요!{' '}
                  </p>
                ) : (
                  <p className="text-body-14M absolute bottom-0 pb-[12px] text-start text-[#11111199]">
                    {' '}
                    지난 달 대비 <br />{' '}
                    <span className="text-body-16M text-[#4E83F9]"> {scoreRate}% </span>{' '}
                    하강했어요.{' '}
                  </p>
                )}
              </button>

              <button
                onClick={() => navigate('/report/growth/timeline')}
                className="relative flex w-[77%] flex-col justify-between gap-[10px] rounded-[7px] bg-white pt-[11px] pr-[12px] pb-[11px] pl-[12px]"
              >
                <div className="flex flex-col gap-[5px]">
                  <div className="flex flex-col gap-[6px]">
                    <div className="flex items-center justify-end gap-1">
                      <span className="text-body-16B text-[#4E83F9]"> {scoreRate}% </span>
                      {type === 'up' ? (
                        <span className="text-xs text-[#4E83F9]"> ▲ </span>
                      ) : (
                        <span className="rotate-180 text-xs text-[#4E83F9]"> ▲ </span>
                      )}
                    </div>

                    <div className="flex h-[76.05px] flex-1 items-center justify-center">
                      <ComparisonIncrease type={type} percentage={scoreRate} />
                    </div>
                  </div>

                  <div className="flex flex-1 items-end justify-between">
                    <p className="text-caption-12R text-[#11111166]"> {lastMonth}월 </p>
                    <p className="text-caption-12R text-[#11111166]"> {currentMonth}월 </p>
                  </div>
                </div>

                {type === 'up' ? (
                  <p className="text-body-14M absolute bottom-0 pb-[12px] text-start text-[#11111199]">
                    {' '}
                    지난 달 대비 <br />{' '}
                    <span className="text-body-16M text-[#4E83F9]"> {scoreRate}% </span>{' '}
                    상승했어요!{' '}
                  </p>
                ) : (
                  <p className="text-body-14M absolute bottom-0 pb-[12px] text-start text-[#11111199]">
                    {' '}
                    지난 달 대비 <br />{' '}
                    <span className="text-body-16M text-[#4E83F9]"> {scoreRate}% </span>{' '}
                    하강했어요.{' '}
                  </p>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReportMainPage;
