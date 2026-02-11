import { useState, useEffect } from 'react';
import { getUserLevel } from '../../apis/level';
import { ROLE_THEME_MAP } from '../../constants/roleTheme';

interface LevelCardProps {
    role : string;
}

const LevelCard = ({ role } : LevelCardProps) => {
    const theme = ROLE_THEME_MAP[role] || ROLE_THEME_MAP['designer'];

    const roleImages : Record<string, string> = {
        "pm" : "/images/growth/pm.png",
        "designer" : "/images/growth/designer.png",
        "frontend" : "/images/growth/frontend.png",
        "backend" : "/images/growth/backend.png"
    };

    const imageUrl = roleImages[role] || roleImages['designer'];

    const [level, setLevel] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const [description, setDescription] = useState(""); 
    
    useEffect(() => {
        const fetchLevel = async () => {
            try {
                const response = await getUserLevel();
        
                setLevel(response.result.level);
                setPercentage(response.result.percentage);
                setDescription(response.result.description);
            }
    
            catch (error) {
                console.log("사용자 찾을 수 없음");
            }
        }

        fetchLevel();
    }, []);

    return (
        <div className='flex flex-col shadow-[0_0_10px_0_#E3E3E3] rounded-[16px]'>
            <div className='flex flex-col bg-white px-[17px] py-[18px] rounded-t-[16px] gap-[10px]'>
                <div className='flex flex-1 gap-[8px] items-center'>
                    <div className={`flex w-[28px] h-[28px] rounded-full ${theme.primaryBg} border-[3px] ${theme.border}`}>
                        <p className={`flex flex-1 items-center justify-center text-caption-12M text-center ${theme.surfaceText}`}> {level} </p>
                    </div>

                    <div className='flex flex-col'>
                        <span className='text-[#111111] text-body-eng-16SB'> Level {level} </span>
                        <p className='text-caption-12M text-[#11111166]'> {description} </p>
                    </div>
                </div>

                <div 
                className='relative flex items-center rounded-[60px] h-[30px] p-[3px] z-10'
                style={{ backgroundColor: `color-mix(in srgb, ${theme.primaryVar}, transparent 90%)` }}
                >
                    <div 
                    className='absolute left-[3px] flex justify-end items-center rounded-[60px] h-[24px] z-20 transition-all duration-300'
                    style={{ 
                        width: `calc(${percentage}% - 6px)`,
                        minWidth: '24px',
                        backgroundImage: `linear-gradient(to right, ${theme.surfaceVar}, ${theme.primaryVar})` 
                    }}>

                        {percentage > 20 && (
                            <p className={`text-caption-12M text-base-100 ${percentage >= 95 && percentage < 97 ? `absolute right-[15px]` : percentage >= 97 ? "absolute right-[30px]" : "pr-[10px]"}`}>
                                {percentage}%
                            </p>
                        )}
                    </div>

                    <div className='absolute inset-0 flex justify-between items-center px-[3px] z-30 pointer-events-none'>
                        <div 
                        className="flex items-center justify-center w-[25.05px] h-[24px] rounded-full"
                        style={{ backgroundImage: `linear-gradient(to right, ${theme.secondaryVar}, ${theme.primaryVar})` }}
                        >
                            <div 
                            className="flex items-center justify-center w-[22.05px] h-[21px] rounded-full"
                            style={{ backgroundImage: `linear-gradient(to bottom, ${theme.surfaceVar}, ${theme.primaryVar})` }}
                            >
                                <span className={`text-caption-12M ${theme.surfaceText}`}> {level} </span>
                            </div>
                        </div>

                        <div 
                        className="flex opacity-50 items-center justify-center w-[25.05px] h-[24px] rounded-full"
                        style={{ backgroundImage: `linear-gradient(to right, ${theme.secondaryVar}, ${theme.primaryVar})` }}
                        >
                            <div 
                        className="flex items-center justify-center w-[22.05px] h-[21px] rounded-full"
                            style={{ backgroundImage: `linear-gradient(to bottom, ${theme.surfaceVar}, ${theme.primaryVar})` }}
                            >
                                <span className={`text-caption-12M ${theme.surfaceText}`}> {level + 1} </span>
                            </div>
                        </div>
                    </div>


                    {percentage <= 20 && (
                        <p className={`absolute text-caption-12M ${theme.primaryText}`}
                            style={{ 
                                left: percentage <= 8 ? '35px' : `calc(${percentage}% + 5px)`,
                                transform: 'translateY(0)'
                            }}
                        >
                            {percentage}%
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
                    <p className='text-body-14M text-base-100 text-center'> LV. {level} </p>
                </div>
            </div>
        </div>
    )
}

export default LevelCard
