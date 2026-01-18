import ReportNavbar from '../../components/report/ReportNavbar'
import KPIComment from '../../components/report/KPIComment'

const CoreKPIDetailPage = () => {
    /*
    // 인스타그램 공유하기 로직
    const shareToInstagramStory = () => {
        const imageUrl = encodeURIComponent(`${window.location.origin}/public/icons/KPIcard_1.svg`);

        window.location.href =
        `instagram://story-camera?backgroundImage=${imageUrl}`;
    };
    */

    return (
        <div>
            <ReportNavbar />
            <div className='flex flex-col bg-white items-center justify-center overflow-hidden'>
                <div className='flex flex-1 items-center justify-center gap-[14px]'>
                    <div className='bg-[#FEE0DB] w-[284px] h-[383px] rounded-[14px]'></div>
                    <img 
                    src="/icons/reports/KPIcard_2.svg"
                    className='w-[279px] h-[416.7115478515625px]'
                    />
                    <div className='bg-[#FEE0DB] w-[284px] h-[383px] rounded-[14px]'></div>
                </div>
                <div className='flex flex-col bg-[radial-gradient(circle_at_center,_rgba(222,214,255,1)_0%,_rgba(222,214,255,0)_100%)] w-full bg-white pt-[32px] pb-[32px] pr-[16px] pl-[16px] gap-[16px]'>
                    <KPIComment />
                    <div className='flex flex-col items-center text-center justify-center border-t-[1px] border-[#E3E3E3]'>
                        <p className='text-center pt-[15px] pb-[15px] justify-center text-caption-12M text-[#111111CC]'> 노력으로 완성된 나의 독보적 역량, 자랑하러 가기 </p>
                        <button 
                        className='flex bg-black h-[48px] rounded-[8px] pt-[12px] pb-[12px] pr-[100px] pl-[100px] gap-[10px]'> 
                            <img 
                            src="/icons/reports/instagramIcon.svg"
                            className=''
                            />
                            <p className='flex-1 text-body-16M text-[#F5F8FF]'> Instagram 공유 </p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CoreKPIDetailPage
