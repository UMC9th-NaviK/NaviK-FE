const KPISearchBar = () => {
    return (
        <div className='flex flex-col pt-[16px] pr-[16px] pl-[16px] bg-white-background gap-[10px]'>
            <button className='flex flex-1 justify-between items-center rounded-full pt-[10px] pb-[10px] pr-[18px] pl-[18px] bg-white border-1 border-[#DBEBFE]'>
                <p className='text-body-14M text-[#11111166]'> KPI 역량 검색하기 </p>
                <img 
                src="/icons/reports/searchBar.svg"
                alt="돋보기 아이콘"
                />
            </button>
            <div className='flex flex-1 gap-[4px] items-center justify-end'>
                <img 
                src="/icons/reports/warningIcon.svg"
                alt="경고"
                className='w-[14px] h-[14px]'
                />
                <p className='text-caption-12M text-[#11111166]'> AI 검사 결과 유의사항 </p>
            </div>
        </div>
    )
}

export default KPISearchBar
