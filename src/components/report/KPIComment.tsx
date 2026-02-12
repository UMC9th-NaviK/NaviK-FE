import { ROLE_THEME_MAP } from "../../constants/roleTheme";
import type { KPICardDetailResponseResult } from "../../types/kpiCard";
import { useKPIScore } from "../../hooks/queries/useKPIScore";

interface KPICommentProps {
    role : string;
    detailData: KPICardDetailResponseResult;
}

const KPIComment = ({ role, detailData } : KPICommentProps) => {
    const theme = ROLE_THEME_MAP[role] || ROLE_THEME_MAP['designer'];

    const contentLines = detailData.content.content.split('\n').filter(line => line.trim() !== "");
        
    const firstSentence = contentLines[0] || "";
    const restOfContent = contentLines.slice(1, -1).join('\n');
    const lastContent = contentLines[contentLines.length - 1] || "";

    const { data: scoreData, isLoading } = useKPIScore(detailData.kpiCardId);

    const topPercentage = scoreData?.topPercent ?? 0;
    const bottomPercentage = scoreData?.bottomPercent ?? 0;

    const isCore = location.pathname === '/report/core/detail';

    if (isLoading) return null;

    return (
        <div className='flex flex-col gap-[16px]'>
            <div className='flex flex-col items-center justify-center'>
                <h1 className={`${theme.primaryBg} text-heading-18B rounded-t-[16px] text-center text-white w-full pt-[10px] pb-[10px]`}> {detailData.content.title} </h1>
                <div className='relative text-center bg-white rounded-b-[16px] w-full pt-[19px] pb-[19px] pr-[15px] pl-[15px] overflow-hidden'>
                    <span className='relative text-body-14B z-10'>
                        {firstSentence} <br /> <br />
                    </span> 
                    <span className='relative text-body-14R z-10'>  
                        {restOfContent} <br /> {lastContent}
                    </span>
                    <div 
                    className={`absolute left-0 z-0 bottom-[-17px] w-[250px] h-[250px] ${theme.surfaceBg} mask-icon`}
                    aria-label="나빅 로고"
                    role="img"
                    style={{
                        WebkitMaskImage: 'url(/icons/reports/logo.svg)',
                        maskImage: 'url(/icons/reports/logo.svg)',
                    }}
                    />
                </div>
            </div>

            { isCore ? (
                <div className='flex flex-col gap-[4px]'>
                    <div style={{ paddingLeft: topPercentage === 0 ? `4%` : `${topPercentage}%` }}>
                        <div className='flex flex-col items-center w-[40px] -translate-x-1/2'>
                            <span className={`text-body-14B ${theme.primaryText}`}> {topPercentage}% </span>
                            <div
                            className={`w-[16px] h-[16px] ${theme.primaryBg} mask-icon`}
                            aria-label="화살표"
                            role="img"
                            style={{
                                WebkitMaskImage: 'url(/icons/reports/myCardBackArrow.svg)',
                                maskImage: 'url(/icons/reports/myCardBackArrow.svg)',
                            }}
                            />
                        </div>
                    </div>
                    <div className='flex flex-1 gap-[4px] w-[100%]'>
                        <div 
                        className={`h-[16px] bg-gradient-to-r rounded-full`}
                        style={{ width: `${topPercentage}%`, backgroundImage: `linear-gradient(to right, ${theme.surfaceVar}, ${theme.primaryVar})`,}}> </div>
                        <div className={`h-[16px] bg-white rounded-full`} style={{ width: `${100 - topPercentage}%` }}> </div>
                    </div>
                </div>
            ) : (
                <div className='flex flex-col gap-[4px]'>
                    <div style={{ paddingLeft: bottomPercentage === 0 ? `4%` : `${bottomPercentage}%` }}>
                        <div className='flex flex-col items-center w-[40px] -translate-x-1/2'>
                            <span className={`text-body-14B ${theme.primaryText}`}> {bottomPercentage}% </span>
                            <div
                            className={`w-[16px] h-[16px] ${theme.primaryBg} mask-icon`}
                            aria-label="화살표"
                            role="img"
                            style={{
                                WebkitMaskImage: 'url(/icons/reports/myCardBackArrow.svg)',
                                maskImage: 'url(/icons/reports/myCardBackArrow.svg)',
                            }}
                            />
                        </div>
                    </div>
                    <div className='flex flex-1 gap-[4px] w-full'>
                        <div 
                        className={`h-[16px] bg-gradient-to-r rounded-full`}
                        style={{ width: `${bottomPercentage}%`, backgroundImage: `linear-gradient(to right, ${theme.surfaceVar}, ${theme.primaryVar})`,}}> </div>
                        <div className={`h-[16px] bg-white rounded-full`} style={{ width: `${100 - bottomPercentage}%` }}> </div>
                    </div>
                </div>
            )}

            { isCore ? (
                <span className='text-center text-body-16M text-[#111111CC]'> 
                    전체 PM 취준생이 100명이라면, <br /> 김나비님은 그 중 상위 <span className={`text-heading-20B ${theme.primaryText}`}> {topPercentage}% </span>이에요
                </span>
            ) : (
                <span className='text-center text-body-16M text-[#111111CC]'> 
                    전체 PM 취준생이 100명이라면, <br /> 김나비님은 그 중 하위 <span className={`text-heading-20B ${theme.primaryText}`}> {bottomPercentage}% </span>이에요
                </span>
            ) }

        </div>
    )
}

export default KPIComment
