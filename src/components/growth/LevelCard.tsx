import { ROLE_THEME_MAP } from '../../constants/roleTheme';
import type { Role } from '../../types/role';

interface LevelCardProps {
    role : Role;
}

const LevelCard = ({ role } : LevelCardProps) => {
    const percent = 9;

    const theme = ROLE_THEME_MAP[role] || ROLE_THEME_MAP['designer'];

    const roleImages = {
        pm : "/images/growth/pm.png",
        designer : "/images/growth/designer.png",
        frontend : "/images/growth/frontend.png",
        backend : "/images/growth/backend.png"
    };

    const imageUrl = roleImages[role] || roleImages['designer'];

    return (
        <div className='flex flex-col shadow-[0_0_10px_0_#E3E3E3] rounded-[16px]'>
            <div className='flex flex-col bg-white px-[17px] py-[18px] rounded-t-[16px] gap-[10px]'>
                <div className='flex flex-1 gap-[8px] items-center'>
                    <div className={`flex w-[28px] h-[28px] rounded-full ${theme.primaryBg} border-[3px] ${theme.border}`}>
                        <p className={`flex flex-1 items-center justify-center text-caption-12M text-center ${theme.surfaceText}`}> 2 </p>
                    </div>

                    <div className='flex flex-col'>
                        <span className='text-[#111111] text-body-eng-16SB'> Level 2 </span>
                        <p className='text-caption-12M text-[#11111166]'> 레벨에 대한 간단한 설명 넣기 </p>
                    </div>
                </div>

                <div 
                className='flex flex-1 rounded-[60px] h-[30px] p-[3px] z-10'
                style={{ backgroundColor: `color-mix(in srgb, ${theme.primaryVar}, transparent 90%)` }}
                >
                    {percent > 8 && (
                        <div 
                        className='flex justify-end items-center rounded-[60px] h-[24px] z-20'
                        style={{ 
                            width: `${percent}%`,
                            backgroundImage: `linear-gradient(to right, ${theme.surfaceVar}, ${theme.primaryVar})` 
                        }}
                        >

                            {percent > 20 && (
                            <p className={`ml-auto pr-[10px] text-caption-12M text-base-100 ${percent >= 90 ? "fixed right-[85px]" : ""}`}>
                                {percent}%
                            </p>
                            )}

                            <div className='absolute left-[36px] w-[303px] flex flex-1 justify-between'>
                                <div 
                                className="flex items-center justify-center w-[25.05px] h-[24px] rounded-full"
                                style={{ 
                                backgroundImage: `linear-gradient(to right, ${theme.secondaryVar}, ${theme.primaryVar})`,
                                }}
                                >
                                    <div 
                                    className="flex items-center justify-center w-[22.05px] h-[21px] rounded-full"
                                    style={{ 
                                    backgroundImage: `linear-gradient(to bottom, ${theme.surfaceVar}, ${theme.primaryVar})`,
                                    }}
                                    >
                                        <span className={`text-caption-12M ${theme.surfaceText}`} >
                                            2
                                        </span>
                                    </div>
                                </div>

                                <div 
                                className="flex opacity-50 items-center justify-center w-[25.05px] h-[24px] rounded-full"
                                style={{ 
                                backgroundImage: `linear-gradient(to right, ${theme.secondaryVar}, ${theme.primaryVar})`,
                                }}
                                >
                                    <div 
                                    className="flex items-center justify-center w-[22.05px] h-[21px] rounded-full"
                                    style={{ 
                                    backgroundImage: `linear-gradient(to bottom, ${theme.surfaceVar}, ${theme.primaryVar})`,
                                    }}
                                    >
                                        <span className={`text-caption-12M ${theme.surfaceText}`} >
                                            3
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {percent <= 8 && (
                        <div className='flex justify-end items-center rounded-[60px] h-[24px] z-20'>
                            <div className='absolute left-[36px] w-[303px] flex flex-1 justify-between'>
                                <div 
                                className="flex items-center justify-center w-[25.05px] h-[24px] rounded-full"
                                style={{ 
                                backgroundImage: `linear-gradient(to right, ${theme.secondaryVar}, ${theme.primaryVar})`,
                                }}
                                >
                                    <div 
                                    className="flex items-center justify-center w-[22.05px] h-[21px] rounded-full"
                                    style={{ 
                                    backgroundImage: `linear-gradient(to bottom, ${theme.surfaceVar}, ${theme.primaryVar})`,
                                    }}
                                    >
                                        <span className={`text-caption-12M ${theme.surfaceText}`} >
                                            2
                                        </span>
                                    </div>
                                </div>

                                <div 
                                className="flex opacity-50 items-center justify-center w-[25.05px] h-[24px] rounded-full"
                                style={{ 
                                backgroundImage: `linear-gradient(to right, ${theme.secondaryVar}, ${theme.primaryVar})`,
                                }}
                                >
                                    <div 
                                    className="flex items-center justify-center w-[22.05px] h-[21px] rounded-full"
                                    style={{ 
                                    backgroundImage: `linear-gradient(to bottom, ${theme.surfaceVar}, ${theme.primaryVar})`,
                                    }}
                                    >
                                        <span className={`text-caption-12M ${theme.surfaceText}`} >
                                            3
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {percent > 8 && percent <= 20 && (
                        <p className={`text-caption-12M ${theme.primaryText}`}
                        style={{
                            transform: "translate(30%, 15%)",
                        }}>
                            {percent}%
                        </p>
                    )}

                    {percent <= 8 && (
                        <p className={`fixed text-caption-12M ${theme.primaryText}`}
                        style={{
                            transform: "translate(180%, 20%)",
                        }}>
                            {percent}%
                        </p>
                    )}
                </div>
            </div>

            <div className='relative flex w-full bg-base-100 rounded-b-[16px]'>
                <img 
                src={imageUrl}
                alt='직무 카드'
                className='rounded-l-[50px] rounded-r-[600px] shadow-[0_0_16px_0_#00000040]'
                />
                <div className='absolute left-[20px] bottom-[16px] flex flex-1 items-center justify-center rounded-[80px] gap-[10px] bg-[#11111133] border-[1px] border-[#FFFFFF99] px-[8px] py-[4px]'>
                    <p className='text-body-14M text-base-100 text-center'> LV. 2 </p>
                </div>
            </div>
        </div>
    )
}

export default LevelCard
