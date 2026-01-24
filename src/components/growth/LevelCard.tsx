import { ROLE_THEME_MAP } from '../../constants/roleTheme';
import type { Role } from '../../types/role';

interface LevelCardProps {
    role : Role;
}

const LevelCard = ({ role } : LevelCardProps) => {
    const theme = ROLE_THEME_MAP[role] || ROLE_THEME_MAP['designer']

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
                    <div 
                    className='flex rounded-[60px] h-[24px] z-20'
                    style={{ 
                        width: '65%',
                        backgroundImage: `linear-gradient(to right, ${theme.surfaceVar}, ${theme.primaryVar})` 
                    }}
                    >
                        <div className='absolute w-[303px] flex flex-1 justify-between'>
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
                </div>
            </div>

            <div className=''>
                <img 
                src='/images/growth/pm_banner.png'
                />
            </div>
        </div>
    )
}

export default LevelCard
