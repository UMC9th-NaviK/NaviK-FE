import { useState } from "react";
import GoalsNavbar from "../../components/goals/GoalsNavbar";

const ModifyingGoalsPage = () => {
    const today = new Date();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isClick, setIsClick] = useState(false);

    const week = ['일', '월', '화', '수', '목', '금', '토'];

    const renderCalendar = () => {
        const year = today.getFullYear();
        const month = today.getMonth();

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const lastDateOfMonth = new Date(year, month + 1, 0).getDate();

        const lastDateOfPrevMonth = new Date(year, month, 0).getDate();

        const days = [];

        for (let i = firstDayOfMonth - 1; i >= 0; i--) {
            days.push({
                date: lastDateOfPrevMonth - i,
                currentMonth: false,
                id: `prev-${i}`
            });
        }

        for (let i = 1; i <= lastDateOfMonth; i++) {
            days.push({
                date: i,
                currentMonth: true,
                id: `curr-${i}`
            });
        }

        return days;
    };

    const calendarDays = renderCalendar();

    const handleClick = () => setIsClick(prev => !prev);

    const formatDate = (date: Date) => {
        return `${date.getFullYear()}년 ${String(date.getMonth() + 1).padStart(2, '0')}월 ${String(date.getDate()).padStart(2, '0')}일`;
    };

    return (
        <div>
            <GoalsNavbar />
            <div className="bg-white-background flex flex-col p-[16px]">
                <div className="flex flex-col bg-white shadow-[0_0_10px_0_#DBEBFE] rounded-[16px] p-[16px] gap-[24px]">
                    <div className="flex flex-col gap-[16px]">
                        <div className="flex flex-col gap-[12px]">
                            <p className="text-body-16B text-base-900"> 목표를 입력해주세요. </p>
                            <textarea 
                                className="bg-white h-[83px] rounded-[8px] border-[1px] border-primary-blue-200 p-[16px] gap-[10px] text-caption-12M text-[#11111166] resize-none focus:outline-none"
                                placeholder="나의 목표를 작성하고, 성장의 첫 계단을 나아가보세요."
                            />
                        </div>

                        <div className="flex flex-col gap-[16px]">
                            <p className="text-body-16B text-base-900"> 목표 기한 </p>

                            <div className="flex flex-1 rounded-[8px] py-[8px] px-[16px] border-[1px] border-primary-blue-200 gap-[10px]">
                                <div className="flex flex-1 items-center justify-between">
                                    <p className="text-body-14M text-[#111111CC]"> { formatDate(selectedDate) } </p>
                                    <button onClick={handleClick}>
                                        <img 
                                            src="/icons/goals/material-symbols_arrow-back-ios-new-rounded.svg"
                                            alt="화살표"
                                            className={`w-[24px] h-[24px] transition-transform ${isClick ? "" : "rotate-[180deg]"}`}
                                        />
                                    </button>
                                </div>
                            </div>

                            {isClick && (
                                <div className="flex flex-col gap-[13.73px] animate-fade-in">
                                    <p className="text-body-14B text-[#111111CC]">
                                        {today.getFullYear()}년 {today.getMonth() + 1}월
                                    </p>
                                    
                                    <div className="grid grid-cols-7 items-center h-[35px] border-b-[0.8px] border-primary-blue-200">
                                        {week.map((day) => (
                                            <div key={day} className="text-center text-caption-12M text-primary-blue-500">
                                                {day}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-7 gap-[13.73px]">
                                        {calendarDays.map((item) => {
                                            const isSelected = item.currentMonth && selectedDate.getDate() === item.date && selectedDate.getMonth() === today.getMonth();
                                            
                                            return (
                                                <div 
                                                    key={item.id}
                                                    onClick={() => item.currentMonth && setSelectedDate(new Date(today.getFullYear(), today.getMonth(), item.date))}
                                                    className="flex items-center justify-center cursor-pointer"
                                                >
                                                    <div className={`
                                                        flex items-center justify-center w-[24px] h-[24px] text-caption-12M
                                                        ${!item.currentMonth ? "text-[#11111133]" : "text-[#111111CC]"}
                                                        ${isSelected ? "bg-primary-blue-500 text-white rounded-full" : ""}
                                                    `}>
                                                        {item.date}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>  
                    </div>

                    <div className="flex flex-1 items-center justify-center gap-[16px]">
                        <button className="flex items-center justify-center h-[48px] w-[147.5px] rounded-[8px] px-[40px] py-[12px] bg-base-200">
                            <p className="text-center text-body-16B text-base-600"> 취소 </p>
                        </button>

                        <button className="flex items-center justify-center h-[48px] w-[147.5px] rounded-[8px] px-[20px] py-[12px] bg-primary-blue-500">
                            <p className="text-center text-body-16B text-base-100"> 변경 사항 저장 </p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModifyingGoalsPage;