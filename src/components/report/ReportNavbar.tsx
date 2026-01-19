import { useLocation, useNavigate } from 'react-router-dom'

const ReportNavbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const title : Record<string, string> = {
        '/report/myCard' : 'KPI 진단 결과',
        '/report/core' : 'KPI 진단 결과',
        '/report/core/detail' : '핵심 역량',
        '/report/overcoming' : 'KPI 진단 결과',
        '/report/overcoming/detail' : '극복 역량',
        '/report/growth' : 'Growth Log',
        '/report/growth/write' : '성장 기록 입력',
        '/report/growth/timeline' : '성장 타임라인',
    }

    const getTitle = title[location.pathname] || '리포트';

    return (
        <nav className='flex bg-white items-center p-[24px] gap-[10px]'>
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
        </nav>
    )
}

export default ReportNavbar
