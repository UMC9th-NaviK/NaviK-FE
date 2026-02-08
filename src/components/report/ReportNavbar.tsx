import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'

const ReportNavbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [isClick, setIsClick] = useState(false);

    const title : Record<string, string> = {
        '/report/myCard' : 'KPI 진단 결과',
        '/report/core' : 'KPI 진단 결과',
        '/report/core/detail' : '강점 KPI',
        '/report/overcoming' : 'KPI 진단 결과',
        '/report/overcoming/detail' : '보완 KPI',
        '/report/growth' : 'Growth Log',
        '/report/growth/write' : '성장 기록 입력',
        '/report/growth/timeline' : '성장 타임라인',
    }

    const getTitle = title[location.pathname] || '리포트';

    const handleClick = () => {
        setIsClick(prev => !prev);
    }

    return (
        <nav className='flex bg-white items-center p-[24px] gap-[10px]'>
                { location.pathname === '/report/myCard' || location.pathname === '/report/overcoming' || location.pathname === '/report/core' ? (
                    <div className='flex flex-1 justify-between'>
                        <button
                        onClick={() => navigate(-1)}>
                            <img 
                            src="/icons/reports/prevButton.svg"
                            alt="뒤로가기 버튼"
                            className='w-[24px] h-[24px]'
                            />
                        </button>
        
                        <h1 className='text-heading-20B'> { getTitle } </h1>
    
                        <button 
                        onClick={handleClick}
                        className='relative w-[24px] h-[24px]'> 
                            <img
                            src="/icons/reports/material-symbols_info-outline-rounded.svg"
                            alt='도움말'
                            />

                            {isClick && (
                                <div className='absolute z-20 top-[35px] right-[-9px] flex flex-col p-[16px] w-[218px] h-[182px] rounded-[14px] border-[1px] border-base-300 backdrop-blur-md bg-[#FFFFFFB3] shadow-[0_0_30px_0_#1111111A]'>
                                    <div className="absolute -top-[7px] right-[14px] w-3 h-3 bg-[#FFFFFFE5] border-t border-l border-base-300 rotate-46">  </div>
                                    <div className='flex flex-col gap-[8px]'>
                                        <div className='flex flex-1 gap-[4px]'>
                                            <img 
                                            src="/icons/reports/material-symbols_warning-outline-rounded.svg"
                                            alt='경고'
                                            className='w-[16px] h-[16px]'
                                            />
                                            <p className='text-caption-12M text-[#11111199]'> AI 진단 결과 유의사항 </p>
                                        </div>

                                        <div className='flex flex-col gap-[5px]'>
                                            <p className='text-caption-12R text-[#11111166] text-start'> 1. 본 결과는 AI가 입력된 정보와 응답을 바탕으로 분석한 참고용 진단입니다. </p>
                                            <p className='text-caption-12R text-[#11111166] text-start'> 2. 개인의 능력, 성향, 잠재력을 단정하거나 확정적으로 판단하지 않습니다. </p>
                                            <p className='text-caption-12R text-[#11111166] text-start'> 3. 결과는 상황, 경험, 환경에 따라 달라질 수 있으며 자기 이해를 돕기 위한 자료로 활용하시기 바랍니다. </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </button>
                    </div>
                ) : (
                    <div className='flex flex-1 justify-between'>
                        <button>
                            <img 
                            src="/icons/reports/prevButton.svg"
                            alt="뒤로가기 버튼"
                            className='w-[24px] h-[24px]'
                            onClick={() => navigate(-1)}
                            />
                        </button>
        
                        <h1 className='text-heading-20B'> { getTitle } </h1>
        
                        <div className='w-[24px] h-[24px] border-white'>  </div>
                    </div>
                )}
        </nav>
    )
}

export default ReportNavbar
