import { ROLE_THEME_MAP } from "../../constants/roleTheme";
import type { Role } from "../../types/role"

interface KPICommentProps {
    role : Role;
}

const KPIComment = ({ role } : KPICommentProps) => {
    const theme = ROLE_THEME_MAP[role] || ROLE_THEME_MAP['designer'];

    return (
        <div className='flex flex-col gap-[16px]'>
            <div className='flex flex-col items-center justify-center'>
                <h1 className={`${theme.primaryBg} text-heading-18B rounded-t-[16px] text-center text-white w-full pt-[10px] pb-[10px]`}> 사람의 마음을 읽는 건 <br /> 아직 어려워요... </h1>
                <div className='relative text-center bg-white rounded-b-[16px] w-full pt-[19px] pb-[19px] pr-[15px] pl-[15px] overflow-hidden'>
                    <span className='relative text-body-14B z-10'>
                    사용자의 감정, 동기, 불편함을 깊이 이해하고 <br />
                    그 인사이트를 제품 설계에 반영하는 능력
                    </span> 
                    <span className='relative text-body-14R z-10'>
                    입니다.
                    <br /> PM은 내가 필요한 제품이 아니라 ‘사용자가 필요로 하는 제품’을 만들어야 합니다. <br /> <br />

                    따라서 공감력은 단순한 감정이 아닌, 데이터 기반의 <br />
                    관찰과 감성적 해석력이 결합된 능력입니다. <br />
                    좋은 PM은 유저 인터뷰, 피드백, 행동 데이터에서 <br />
                    ‘사용자의 진짜 문제’를 끌어낼 줄 알아야 합니다.
                    </span>
                    <div 
                    className={`absolute z-0 right-[105px] bottom-[-17px] w-[250px] h-[250px] ${theme.surfaceBg} mask-icon`}
                    aria-label="나빅 로고"
                    role="img"
                    style={{
                        WebkitMaskImage: 'url(/icons/reports/logo.svg)',
                        maskImage: 'url(/icons/reports/logo.svg)',
                    }}
                    />
                </div>
            </div>
            <div className='flex flex-col gap-[4px]'>
                <div className='pl-[16%]'>
                    <div className='flex flex-col items-center w-[31px]'>
                        <span className={`text-body-14B ${theme.primaryText}`}> 20% </span>
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
                    className='w-[20%] h-[16px] bg-gradient-to-r rounded-full' 
                    style={{ backgroundImage: `linear-gradient(to right, ${theme.surfaceVar}, ${theme.primaryVar})`,}}> </div>
                    <div className='w-[80%] h-[16px] bg-white rounded-full'> </div>
                </div>
            </div>
            <span className='text-center text-body-16M text-[#111111CC]'> 
                전체 PM 취준생이 100명이라면, <br /> 김나비님은 그 중 하위 <span className={`text-heading-20B ${theme.primaryText}`}> 20% </span>이에요 🥲
            </span>
        </div>
    )
}

export default KPIComment
