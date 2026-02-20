import { ROLE_THEME_MAP } from '../../constants/roleTheme';
import type { KPICardDetailResponseResult } from '../../types/kpiCard';
import { useKPIScore } from '../../hooks/queries/useKPIScore';
interface KPICommentProps {
  role: string;
  detailData: KPICardDetailResponseResult;
  name: string;
}

const KPIComment = ({ role, detailData, name }: KPICommentProps) => {
  const theme = ROLE_THEME_MAP[role] || ROLE_THEME_MAP['designer'];

  const ROLE_MAP: Record<string, string> = {
    pm: 'PM',
    designer: 'DESIGNER',
    frontend: 'FE',
    backend: 'BE',
  };

  const mappedRole = ROLE_MAP[role];

  const contentLines = detailData.content.content.split('\n').filter((line) => line.trim() !== '');

  const firstSentence = contentLines[0] || '';
  const restOfContent = contentLines.slice(1, -1).join('\n');
  const lastContent = contentLines[contentLines.length - 1] || '';

  const { data: scoreData, isLoading } = useKPIScore(detailData.kpiCardId);

  const topPercentage = scoreData?.topPercent ?? 0;
  const bottomPercentage = scoreData?.bottomPercent ?? 0;

  const isCore = location.pathname === '/report/core/detail';

  if (isLoading) return null;

  return (
    <div className="flex flex-col gap-[16px]">
      <div className="flex flex-col items-center justify-center">
        <h1
          className={`${theme.primaryBg} text-heading-18B w-full rounded-t-[16px] pt-[10px] pb-[10px] text-center text-white`}
        >
          {' '}
          {detailData.content.title}{' '}
        </h1>
        <div className="relative w-full overflow-hidden rounded-b-[16px] bg-white px-8 py-[19px] text-start">
          <span className="text-body-14B relative z-10">
            &nbsp;&nbsp;{firstSentence} <br /> <br />
          </span>
          <span className="text-body-14R relative z-10">
            &nbsp;&nbsp;{restOfContent} <br />
            <br /> &nbsp;&nbsp;{lastContent}
          </span>
          <div
            className={`absolute bottom-[-17px] left-0 z-0 h-[250px] w-[250px] ${theme.surfaceBg} mask-icon`}
            aria-label="나빅 로고"
            role="img"
            style={{
              WebkitMaskImage: 'url(/icons/reports/logo.svg)',
              maskImage: 'url(/icons/reports/logo.svg)',
            }}
          />
        </div>
      </div>

      {isCore ? (
        <div className="flex flex-col gap-[4px]">
          <div style={{ paddingLeft: topPercentage === 0 ? `4%` : `${topPercentage}%` }}>
            <div className="flex w-[40px] -translate-x-1/2 flex-col items-center">
              <span className={`text-body-14B ${theme.primaryText}`}> {topPercentage}% </span>
              <div
                className={`h-[16px] w-[16px] ${theme.primaryBg} mask-icon`}
                aria-label="화살표"
                role="img"
                style={{
                  WebkitMaskImage: 'url(/icons/reports/myCardBackArrow.svg)',
                  maskImage: 'url(/icons/reports/myCardBackArrow.svg)',
                }}
              />
            </div>
          </div>
          <div className="flex w-[100%] flex-1 gap-[4px]">
            <div
              className={`h-[16px] rounded-full bg-gradient-to-r`}
              style={{
                width: `${topPercentage}%`,
                backgroundImage: `linear-gradient(to right, ${theme.surfaceVar}, ${theme.primaryVar})`,
              }}
            >
              {' '}
            </div>
            <div
              className={`h-[16px] rounded-full bg-white`}
              style={{ width: `${100 - topPercentage}%` }}
            >
              {' '}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-[4px]">
          <div style={{ paddingLeft: bottomPercentage === 0 ? `4%` : `${bottomPercentage}%` }}>
            <div className="flex w-[40px] -translate-x-1/2 flex-col items-center">
              <span className={`text-body-14B ${theme.primaryText}`}> {bottomPercentage}% </span>
              <div
                className={`h-[16px] w-[16px] ${theme.primaryBg} mask-icon`}
                aria-label="화살표"
                role="img"
                style={{
                  WebkitMaskImage: 'url(/icons/reports/myCardBackArrow.svg)',
                  maskImage: 'url(/icons/reports/myCardBackArrow.svg)',
                }}
              />
            </div>
          </div>
          <div className="flex w-full flex-1 gap-[4px]">
            <div
              className={`h-[16px] rounded-full bg-white`}
              style={{ width: `${bottomPercentage}%`}}
            >
              {' '}
            </div>
            <div
              className={`h-[16px] rounded-full bg-gradient-to-l`}
              style={{ width: `${100 - bottomPercentage}%`, backgroundImage: `linear-gradient(to left, ${theme.surfaceVar}, ${theme.primaryVar})`}}
            >
              {' '}
            </div>
          </div>
        </div>
      )}

      {isCore ? (
        <span className="text-body-16M text-center text-[#111111CC]">
          전체 {mappedRole} 취준생이 100명이라면, <br /> {name}님은 그 중 상위{' '}
          <span className={`text-heading-20B ${theme.primaryText}`}> {topPercentage}% </span>이에요
        </span>
      ) : (
        <span className="text-body-16M text-center text-[#111111CC]">
          전체 {mappedRole} 취준생이 100명이라면, <br /> {name}님은 그 중 하위{' '}
          <span className={`text-heading-20B ${theme.primaryText}`}> {bottomPercentage}% </span>
          이에요
        </span>
      )}
    </div>
  );
};

export default KPIComment;
