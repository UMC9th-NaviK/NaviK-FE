const ReportMainPage = () => {
  return (
    <div className="flex flex-col w-full bg-[#F5F8FF] bg-[radial-gradient(circle,_#94BBFD_0%,_rgba(184,212,254,0)_100%)]">
      <header className="pl-[24px] pt-[16px] pb-[24px] pr-[24px]">
        <h1 className="text-heading-24B"> 리포트 </h1>
      </header>

      <div className="flex pl-[16px] pr-[16px]">
        <div className="relative flex flex-1 items-center bg-white rounded-full shadow-[0_0_10px_0_#DBEBFE] p-[10px] gap-[10px] overflow-hidden">
          <div className="flex items-center justify-center w-[65px] h-[65px] rounded-full bg-[conic-gradient(from_0deg,#4E83F9,#DBEBFE)]">
            <img className="flex items-center justify-center w-[55px] h-[55px] rounded-full bg-white" />
          </div>

          <img 
          src="/icons/reports/profileCompass.svg" 
          alt="프로필 나침반 아이콘" 
          className="absolute right-[10px] top-[px] w-[100px] h-[100px] rotate-[0deg] z-0 blur-[0.8px]"
          />

          <div className="flex-col items-center justify-center">
            <span className="text-heading-18B">
              김나비 님,
            </span>

            <div className="flex">
              <span className="text-body-16B text-[#4E83F9]">
                PM 
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
            <button className="relative flex items-start justify-start bg-gradient-to-b from-[#79A6FB] to-[#3964D6] h-[111px] rounded-[7px] p-4 overflow-hidden">
              <p className="relative z-10 h-full text-heading-20B text-white text-left"> 내 카드 <br /> 보러가기 </p>
              <img 
              src="/images/reports/goingMyCard.png"
              className="absolute w-[120px] h-[130px] right-[-10px] bottom-[-10px] p-[10px] z-0 opacity-70"
              />
            </button>
            <button className="flex flex-col relative bg-white h-[111px] rounded-[7px] p-4 gap-[5px]">
              <p className="text-heading-20B text-black relative z-10 text-left"> 동료 피드백 </p>
              <p className="text-body-14M relative z-10 text-left"> <text className="text-[#4E83F9]">협업 커뮤니케이션</text>이 <br /> 뛰어나요👍🏻 </p>
              <img 
              src="/images/reports/colleagueFeedback.png"
              className="absolute w-[120px] h-[120px] right-[0px] bottom-[0px] z-0"
              />
            </button>
          </div>
          
          <div className="flex flex-col w-[50%] bg-[rgba(255,255,255,0.5)] h-[238px] rounded-[7px] border-[0.5px] border-white p-4 gap-[32px] pt-[8px] pr-[16px] pb-[8px] pl-[16px]">
            <div className="flex flex-col gap-[10px]">
              <div className="flex flex-1 items-center justify-between">
                <p className="text-heading-20B text-black"> 목표 설정 </p>
                <button>
                  <img 
                  src="/icons/reports/material-symbols_settings-rounded.svg"
                  className="w-[24px] h-[24px]"
                  />
                </button>
              </div>

              <div className="flex flex-col gap-[8px] text-body-14M text-center">
                <p className="bg-[#4E83F9] p-[8px] rounded-[5px] text-white"> 페르소나 3개 구체화 </p>
                <p className="bg-white p-[8px] rounded-[5px] text-[#0E2277]"> 팀 주간 회의 템플릿 </p>
                <p className="bg-white p-[8px] rounded-[5px] text-[#0E2277]"> 데이터 분석 MYSQL </p>
              </div>
            </div>

            <div className="flex flex-1 justify-between items-center">
              <p className="text-body-16M text-black"> 완료할 목표 </p>
              <span className="text-heading-20B text-[#4E83F9]"> 2개 </span>
            </div>
          </div>
        </div>

        <div className="flex w-full bg-[rgba(255,255,255,0.5)] h-[254px] rounded-[7px] border-[0.5px] border-white p-4">
          <div className="flex flex-col w-full gap-[14px]">
            <p className="text-heading-20B text-black"> 성장 로그 </p>
            <div className="flex flex-1 w-full justify-between gap-[7px]">
              <div className="relative w-[62%] flex flex-col bg-white rounded-[7px] pt-[11px] pr-[12px] pb-[11px] pl-[12px] gap-[58px] overflow-hidden">
                <div className="relative z-10">
                  <p className="text-body-16B z-10"> 직무 레벨 배지 </p>
                  <span className="text-heading-24B text-[#4E83F9] relative z-10"> LV. 3 </span>
                  <img 
                  src="/images/reports/levelBadge.png"
                  className="absolute w-[120px] h-[140px] right-[-22px] bottom-[-75px] p-[10px] z-0"
                  />
                </div>
                <p className="text-body-14M text-[#11111199] "> 지난 달 대비 <br /> <span className="text-body-16M text-[#4E83F9]"> 12% </span> 상승했어요! </p>
              </div>

              <div className="relative w-[77%] flex flex-col justify-between bg-white rounded-[7px] pt-[11px] pr-[12px] pb-[11px] pl-[12px]">
                <div className="flex justify-end items-center gap-1">
                  <span className="text-body-16B text-[#4E83F9]"> 11% </span>
                  <span className="text-[#4E83F9] text-xs"> ▲ </span>
                </div>

                <div className="flex-1 flex items-center justify-center">
                  <div className="w-full h-[60px] bg-gradient-to-t from-[#4E83F910] to-transparent border-b border-dashed border-gray-300"> </div>
                </div>

                <p className="text-body-14M text-[#11111199] "> 지난 달 대비 <br /> <span className="text-body-16M text-[#4E83F9]"> 12% </span> 상승했어요! </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
};

export default ReportMainPage;
