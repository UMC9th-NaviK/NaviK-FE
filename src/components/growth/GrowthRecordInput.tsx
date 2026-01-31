import { useNavigate } from "react-router-dom"

const GrowthRecordInput = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col bg-white shadow-[0_0_10px_0_#E3E3E3] p-[16px] rounded-[16px] gap-[10px]">
            <div className="flex flex-col gap-[2px]">
                <p className="text-heading-20B text-[#111111CC]"> 성장 기록 입력 </p>
                <p className="text-body-14M text-[#11111166]"> 나의 활동을 바로 입력하고 성장 그래프로 확인해보세요! </p>
            </div>
            <button 
            className="bg-primary-blue-500 rounded-[10px] px-[15px] py-[12px]"
            onClick={() => navigate('/report/growth/write')}>
                <p className="text-body-16B text-white"> 기록 남기기 </p>
            </button>
        </div>
    )
}

export default GrowthRecordInput
