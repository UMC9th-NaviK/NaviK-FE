import GrowthRecord from "../../components/growth/GrowthRecord";
import ReportNavbar from "../../components/report/ReportNavbar";

const GrowthWritePage = () => {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden bg-slate-50 pb-[16px]">
      <ReportNavbar />

      <div className="absolute w-[618px] h-[494px] left-1/2 -translate-x-1/2 bottom-[-100px] bg-[radial-gradient(50%_50%_at_50%_50%,#94BBFD_0%,rgba(219,235,254,0)_100%)] z-10 opacity-60"></div>

      <div className="relative z-20 flex flex-col gap-[8px]">
        <div className="flex flex-col pt-[16px] px-[16px] gap-[10px]">
          <div className="relative flex flex-1 p-[16px] rounded-[16px] gap-[10px] bg-gradient-to-b from-[#94BBFD] to-[#4E83F9] shadow-[0_0_10px_0_#DBEBFE]">
            <div className="flex flex-col gap-[8px]">
              <p className="text-heading-18B text-white"> 성장 기록 양식을 기반으로 <br /> 더 정확한 진단을 받아보세요! </p>
              <p className="text-caption-12R text-primary-blue-100"> 더 정확한 진단을 위해 활동을 <br /> 역할·행동·결과 중심으로 작성하도록 안내드려요. </p>
            </div>

            <img 
            src="/icons/growth/graphic.svg"
            alt="그래픽"
            className="absolute top-[-5px] right-[-10px] w-[133px] h-[133px] p-[10px]"
            />
          </div>

          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-1 justify-between">
              <div className="flex-col w-[106px] px-[12px] py-[16px] gap-[10px] rounded-[16px] border border-[1px] border-primary-blue-200">
                <div className="flex flex-col items-center justify-center gap-[14px]">
                  <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full p-[5px] bg-gradient-to-b from-[#B8D4FE] to-[#79A6FB]">
                    <img 
                    src="/icons/growth/material-symbols_target.svg"
                    alt="target"
                    className=""
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center gap-[4px]">
                    <p className="text-center text-heading-18B text-[#111111]"> 정확도 <br /> <span className="text-primary-blue-500"> UP! </span> </p>
                    <p className="text-center text-caption-10M text-[#11111199]"> 핵심 정보가 있으면 <br /> 정확도가 높아져요 </p>
                  </div>
                </div>
              </div>

              <div className="flex-col w-[106px] px-[12px] py-[16px] gap-[10px] rounded-[16px] border border-[1px] border-primary-blue-200">
                <div className="flex flex-col items-center justify-center gap-[14px]">
                  <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full p-[5px] bg-gradient-to-b from-[#B8D4FE] to-[#79A6FB]">
                    <img 
                    src="/icons/growth/material-symbols_balance-rounded.svg"
                    alt="target"
                    className=""
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center gap-[4px]">
                    <p className="text-center text-heading-18B text-[#111111]"> 공정성 <br /> <span className="text-primary-blue-500"> UP! </span> </p>
                    <p className="text-center text-caption-10M text-[#11111199] w-[83px]"> 누구나 같은 기준으로 <br /> 평가 받아요 </p>
                  </div>
                </div>
              </div>

              <div className="flex-col w-[106px] px-[12px] py-[16px] gap-[10px] rounded-[16px] border border-[1px] border-primary-blue-200">
                <div className="flex flex-col items-center justify-center gap-[14px]">
                  <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full p-[5px] bg-gradient-to-b from-[#B8D4FE] to-[#79A6FB]">
                    <img 
                    src="/icons/growth/material-symbols_warning-outline-rounded.svg"
                    alt="warning"
                    className=""
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center gap-[4px]">
                    <p className="text-center text-heading-18B text-[#111111]"> 오류 <br /> <span className="text-primary-blue-500"> DOWN! </span> </p>
                    <p className="text-caption-10M text-[#11111199] w-[83px]"> 구조화된 기록을 더 <br /> 안정적으로 분석해요 </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-1 bg-[#DBEBFE80] rounded-[8px] py-[10px] pl-[25px] gap-[20px]">
              <p className="text-body-16B text-primary-blue-900 text-center"> Tip </p>
              <p className="text-caption-12M text-primary-blue-900"> 형식에 맞춰 기록할수록 더 정확한 성장 진단과 <br /> 피드백을 받으실 수 있어요! </p>
            </div>
          </div>

          <div className="flex flex-col gap-[16px]">
            <p className="text-body-16B text-primary-blue-900"> 📌  다른 항해자님들은 이렇게 입력했어요! </p>

            <div className="flex flex-col p-[16px] gap-[10px] rounded-[8px] bg-white shadow-[0_0_10px_0_#DBEBFE]">
              <div className="flex flex-col gap-[16px]">
                <div className="flex flex-1 pb-[10px] gap-[16px] border-b-[1px] border-base-200">
                  <img 
                  src="/icons/growth/material-symbols_expand-circle-right-rounded.svg"
                  alt="expand"
                  className="w-[24px] h-[24px]"
                  />

                  <p className="text-body-14M text-[#111111CC] break-words"> Redis 기반 캐싱을 적용해 API 응답 시간을 평균 240ms → 85ms로 단축시켰어요. </p>
                </div>

                <div className="flex flex-1 pb-[10px] gap-[16px]">
                  <img 
                  src="/icons/growth/material-symbols_expand-circle-right-rounded.svg"
                  alt="expand"
                  className="w-[24px] h-[24px]"
                  />

                  <p className="text-body-14M text-[#111111CC] break-words"> 페르소나 기반 시나리오를 재작성해 주요 플로우를 개선했고, Figma 프로토타입 테스트에서 만족도가 4.1 → 4.7로 상승했어요. </p>
                </div>
              </div>
            </div>
          </div>

          <div className="z-20">
            <GrowthRecord />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowthWritePage;
