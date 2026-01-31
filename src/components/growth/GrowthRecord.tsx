const GrowthRecord = () => {
    return (
        <div className='flex flex-col bg-white rounded-[16px] p-[16px] gap-[10px] border border-[1px] border-primary-blue-500'>
            <div className='flex flex-col gap-[16px]'>
                <p className='text-heading-20B text-base-800'> 성장 기록하기 </p>

                <textarea 
                className="h-[145px] rounded-[8px] border-[1px] border-primary-blue-100 p-[16px] gap-[10px] text-body-14M text-[#11111133] resize-none focus:outline-none"
                placeholder="새로 추가된 나의 경험과 커리어, 핵심 역량을 위주로 성장 타임라인을 채워보세요!"
                />

                <div className="flex flex-1 gap-[16px]">
                    <button className="flex items-center justify-center w-[147.5px] h-[48px] py-[12px] rounded-[8px] gap-[10px] bg-base-200">
                        <p className="w-[28px] text-body-16B text-base-600 text-center"> 취소 </p>
                    </button>
                    <button className="flex items-center justify-center w-[147.5px] h-[48px] py-[12px] rounded-[8px] gap-[10px] bg-primary-blue-500">
                        <p className="w-[58px] text-body-16B text-base-100 text-center"> 작성 완료 </p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default GrowthRecord
