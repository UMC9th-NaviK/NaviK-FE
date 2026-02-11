import { useNavigate } from 'react-router-dom'
import GrowthChart from './GrowthChart'

const GrowthTimeline = () => {
    const navigate = useNavigate();

    return (
        <div className='flex flex-col h-[363px] bg-white shadow-[0_0_10px_0_#E3E3E3] p-[16px] rounded-[10px] gap-[4px]'>
            <div className="flex flex-col gap-[2px]">
                <p className="text-heading-20B text-[#111111CC]"> 성장 타임라인 </p>
                <p className="text-body-14M text-[#11111166]"> 나의 활동을 바로 입력하고 성장 그래프로 확인해보세요! </p>
            </div>
            <div className='flex flex-1 items-center justify-center'>
                <GrowthChart width={'100%'} height={'100%'} unit={'MONTH'} type={'USER_INPUT'} />
            </div>
            <button 
            className="bottom-0 bg-primary-blue-500 w-full rounded-[10px] px-[15px] py-[12px]"
            onClick={() => navigate("/report/growth/timeline")}>
                <p className="text-body-16B text-white"> 자세히 보기 </p>
            </button>
        </div>
    )
}

export default GrowthTimeline
