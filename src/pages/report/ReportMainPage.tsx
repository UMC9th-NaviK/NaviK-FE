import { useNavigate } from "react-router-dom";
import ComparisonIncrease from "../../components/report/ComparisonIncrease";
import { FOOTERPB } from "../../components/common/Footer";
import { useState, useEffect } from "react";
import { useLevel } from "../../hooks/queries/useLevel";
import { useGoals } from "../../hooks/goals/useGoals";
import { useKPIScoreMonthly } from "../../hooks/queries/useKPIScore";
import { useProfile } from "../../hooks/useProfile";

const ReportMainPage = () => {
  const navigate = useNavigate();

  const ROLE_MAP: Record<string, string> = {
    "프로덕트 매니저" : "PM",
    "프로덕트 디자이너": "DESIGNER",
    "프론트엔드 개발자": "FE",
    "백엔드 개발자": "BE",
  };

  const { profile } = useProfile();

  const mappedRole = ROLE_MAP[profile?.job || "프로덕트 매니저"];

  const { data } = useLevel();
  const { goalsList } = useGoals(100, "RECENT");
  const { data : monthlyScoreData } = useKPIScoreMonthly();

  const topThreeGoals = goalsList.slice(0, 3);
  const progressGoalsCount = goalsList.filter((goal) => goal.status === "IN_PROGRESS").length;

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
        } 
        
        else {
            setType('up');
            setScoreRate(monthlyScoreData.changeRate);
        }
    }
  }, [monthlyScoreData?.changeRate]);

  return (
    <div className={`flex flex-col w-full min-h-screen bg-white-background bg-[radial-gradient(circle,_#94BBFD_0%,_rgba(184,212,254,0)_100%)] ${FOOTERPB}`}>
      <header className="pl-[24px] pt-[16px] pb-[24px] pr-[24px]">
        <h1 className="text-heading-24B"> 리포트 </h1>
      </header>

      <div className="flex pl-[16px] pr-[16px]">
        <div className="relative flex flex-1 items-center bg-white rounded-full shadow-[0_0_10px_0_#DBEBFE] p-[10px] gap-[10px] overflow-hidden">
          <div className="flex items-center justify-center w-[65px] h-[65px] rounded-full bg-[conic-gradient(from_0deg,#4E83F9,#DBEBFE)]">
            <img 
            src={`${profile?.profileImageUrl}`}
            alt="프로필 이미지"
            className="flex items-center justify-center w-[55px] h-[55px] rounded-full bg-white" />
          </div>

          <img 
          src="/icons/reports/profileCompass.svg" 
          alt="프로필 나침반 아이콘" 
          className="absolute right-[10px] top-[px] w-[100px] h-[100px] rotate-[0deg] z-0 blur-[0.8px]"
          />

          <div className="flex-col items-center justify-center">
            <span className="text-heading-18B">
              {profile?.nickname} 님,
            </span>

            <div className="flex">
              <span className="text-body-16B text-[#4E83F9]">
                {mappedRole}
              </span>
              <p className="text-body-16B">
                의 성공적인 항해를 위해서🔥
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="flex flex-col items-center pt-[20px] pr-[16px] pb-[20px] pl-[16px] gap-[16px]">
        <div className="w-full flex flex-1 gap-[16px] items-center justify-center">
          <div className="flex flex-col gap-[16px] w-[50%]">
            <button 
            onClick={() => navigate("/report/core")}
            className="relative flex items-start justify-start bg-gradient-to-b from-[#79A6FB] to-[#3964D6] h-[111px] rounded-[7px] p-4 overflow-hidden">
              <p className="relative z-10 h-full text-heading-20B text-white text-left"> 내 카드 <br /> 보러가기 </p>
              <img 
              src="/images/reports/goingMyCard.png"
              alt=""
              className="absolute w-[120px] h-[130px] right-[-10px] bottom-[-10px] p-[10px] z-0 opacity-70"
              />
            </button>

            <button 
            onClick={() => navigate("/social/evaluation")}
            className="flex flex-col relative bg-white h-[111px] rounded-[7px] p-4 gap-[5px]">
              <p className="text-heading-20B text-black relative z-10 text-left"> 동료 피드백 </p>
              <p className="text-body-14M relative z-10 text-left"> <span className="text-[#4E83F9]">협업 커뮤니케이션</span>이 <br /> 뛰어나요👍🏻 </p>
              <img 
              src="/images/reports/colleagueFeedback.png"
              alt=""
              className="absolute w-[120px] h-[120px] right-[0px] bottom-[0px] z-0"
              />
            </button>
          </div>
          
          <button 
          onClick={() => navigate("/goals")}
          className="flex flex-col w-[50%] bg-[rgba(255,255,255,0.5)] h-[238px] rounded-[7px] border-[0.5px] border-white p-4 gap-[32px] pt-[8px] pr-[16px] pb-[8px] pl-[16px]">
            <div className="flex flex-col gap-[10px]">
              <div className="flex flex-1 items-center justify-between">
                <p className="text-heading-20B text-black"> 목표 설정 </p>
              </div>

              <div className="flex flex-col gap-[8px] text-body-14M text-center">
                {topThreeGoals.map((goal) => (
                  <p 
                      key={goal.id}
                      className={`${goal.status === "IN_PROGRESS" ? "bg-primary-blue-500 text-white" : "bg-white text-[#0E2277]"} p-[8px] rounded-[5px]`}
                  >
                      {goal.title}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex flex-1 justify-between items-center">
              <p className="text-body-16M text-black"> 완료할 목표 </p>
              <span className="text-heading-20B text-[#4E83F9]"> {progressGoalsCount} 개 </span>
            </div>

          </button>
        </div>

        <div className="flex w-full bg-[rgba(255,255,255,0.5)] h-[274px] rounded-[7px] border-[0.5px] border-white p-4">
          <div className="flex flex-col w-full gap-[14px]">
            <p className="text-heading-20B text-black"> 성장 로그 </p>
            <div className="flex flex-1 w-full justify-between gap-[7px]">
              <button 
              onClick={() => navigate("/report/growth")}
              className="relative w-[62%] flex flex-col bg-white rounded-[7px] pt-[11px] pr-[12px] pb-[11px] pl-[12px] gap-[58px] overflow-hidden">
                <div className="relative flex flex-col z-10 items-start">
                  <p className="text-body-16B z-10"> 직무 레벨 배지 </p>
                  <span className="text-heading-24B text-[#4E83F9] relative z-10"> LV. {data?.levelValue} </span>
                  <img 
                  src="/images/reports/levelBadge.png"
                  alt=""
                  className="absolute w-[120px] h-[140px] right-[-22px] bottom-[-75px] p-[10px] z-0"
                  />
                </div>
                { type === 'up' ? (
                  <p className="absolute bottom-0 text-start pb-[12px] text-body-14M text-[#11111199]"> 지난 달 대비 <br /> <span className="text-body-16M text-[#4E83F9]"> {scoreRate}% </span> 상승했어요! </p>
                ) : (
                  <p className="absolute bottom-0 text-start pb-[12px] text-body-14M text-[#11111199]"> 지난 달 대비 <br /> <span className="text-body-16M text-[#4E83F9]"> {scoreRate}% </span> 하강했어요. </p>
                )}
              </button>

              <button 
              onClick={() => navigate("/report/growth/timeline")}
              className="relative w-[77%] flex flex-col justify-between bg-white rounded-[7px] gap-[10px] pt-[11px] pr-[12px] pb-[11px] pl-[12px]">
                <div className="flex flex-col gap-[5px]">
                  <div className="flex flex-col gap-[6px]">
                    <div className="flex justify-end items-center gap-1">
                      <span className="text-body-16B text-[#4E83F9]"> {scoreRate}% </span>
                      { type === 'up' ? (
                        <span className="text-[#4E83F9] text-xs"> ▲ </span>
                      ) : (
                        <span className="text-[#4E83F9] text-xs rotate-180"> ▲ </span>
                      )}
                    </div>

                    <div className="flex-1 flex items-center justify-center">
                      <ComparisonIncrease type={type} percentage={scoreRate} />
                    </div>
                  </div>

                  <div className="flex flex-1 justify-between"> 
                    <p className="text-caption-12R text-[#11111166]"> {lastMonth}월 </p>
                    <p className="text-caption-12R text-[#11111166]"> {currentMonth}월 </p>
                  </div>
                </div>

                { type === 'up' ? (
                  <p className="absolute bottom-0 text-start pb-[12px] text-body-14M text-[#11111199]"> 지난 달 대비 <br /> <span className="text-body-16M text-[#4E83F9]"> {scoreRate}% </span> 상승했어요! </p>
                ) : (
                  <p className="absolute bottom-0 text-start pb-[12px] text-body-14M text-[#11111199]"> 지난 달 대비 <br /> <span className="text-body-16M text-[#4E83F9]"> {scoreRate}% </span> 하강했어요. </p>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
};

export default ReportMainPage;
