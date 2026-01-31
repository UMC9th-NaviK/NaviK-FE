import { useState } from "react";
import GoalsNavbar from "../../components/goals/GoalsNavbar";

const ModifyingGoalsPage = () => {
    const today = new Date();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isClick, setIsClick] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());

    const week = ['일', '월', '화', '수', '목', '금', '토'];

    const renderCalendar = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

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

    const handleMonthDown = () => {
        if (currentDate.getFullYear() < today.getFullYear() || 
            (currentDate.getFullYear() === today.getFullYear() && currentDate.getMonth() <= today.getMonth())) {
            return;
        }

        const newDate = new Date(currentDate);

        newDate.setMonth(currentDate.getMonth() - 1);

        setCurrentDate(newDate);
    };
    
    const handleMonthUp = () => {
        const newDate = new Date(currentDate);

        newDate.setMonth(currentDate.getMonth() + 1);
        
        setCurrentDate(newDate);
    };

    const formatDate = (date: Date) => {
        return `${date.getFullYear()}년 ${String(date.getMonth() + 1).padStart(2, '0')}월 ${String(date.getDate()).padStart(2, '0')}일`;
    };

    const selectMonth = 
    currentDate.getFullYear() > today.getFullYear() || 
    (currentDate.getFullYear() === today.getFullYear() && currentDate.getMonth() > today.getMonth());

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
                                    <div className="flex flex-1 items-center justify-center gap-[8px]">
                                        <button 
                                        onClick={handleMonthDown}
                                        className={`${selectMonth ? "text-primary-blue-300" : "text-base-300"}`}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.45103 10.975C7.30103 11.075 7.1887 11.2 7.11403 11.35C7.03937 11.5 7.00137 11.6583 7.00003 11.825C6.9987 11.9917 7.03637 12.15 7.11303 12.3C7.1897 12.45 7.30203 12.575 7.45003 12.675L15.6 17.85C15.6834 17.9 15.771 17.9373 15.863 17.962C15.955 17.9867 16.0427 17.9993 16.126 18C16.3927 18 16.626 17.904 16.826 17.712C17.026 17.52 17.126 17.2827 17.126 17V6.65C17.126 6.36667 17.026 6.129 16.826 5.937C16.626 5.745 16.3927 5.64933 16.126 5.65C16.0427 5.65 15.9554 5.66267 15.864 5.688C15.7727 5.71333 15.685 5.75067 15.601 5.8L7.45103 10.975Z" fill="currentColor"/>
                                            </svg>

                                        </button>

                                        <p className="text-center text-body-14B text-[#111111CC]">
                                            {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
                                        </p>

                                        <button 
                                        onClick={handleMonthUp}
                                        className="rotate-180 text-primary-blue-300">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.45103 10.975C7.30103 11.075 7.1887 11.2 7.11403 11.35C7.03937 11.5 7.00137 11.6583 7.00003 11.825C6.9987 11.9917 7.03637 12.15 7.11303 12.3C7.1897 12.45 7.30203 12.575 7.45003 12.675L15.6 17.85C15.6834 17.9 15.771 17.9373 15.863 17.962C15.955 17.9867 16.0427 17.9993 16.126 18C16.3927 18 16.626 17.904 16.826 17.712C17.026 17.52 17.126 17.2827 17.126 17V6.65C17.126 6.36667 17.026 6.129 16.826 5.937C16.626 5.745 16.3927 5.64933 16.126 5.65C16.0427 5.65 15.9554 5.66267 15.864 5.688C15.7727 5.71333 15.685 5.75067 15.601 5.8L7.45103 10.975Z" fill="currentColor"/>
                                            </svg>
                                        </button>
                                    </div>
                                    
                                    <div className="grid grid-cols-7 items-center h-[35px] border-b-[0.8px] border-primary-blue-200">
                                        {week.map((day) => (
                                            <div key={day} className="text-center text-caption-12M text-primary-blue-500">
                                                {day}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-7 gap-[13.73px]">
                                        {calendarDays.map((item) => {
                                            const isSelected = item.currentMonth && selectedDate.getDate() === item.date && selectedDate.getMonth() === currentDate.getMonth();
                                            
                                            return (
                                                <div 
                                                    key={item.id}
                                                    onClick={() => item.currentMonth && setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), item.date))}
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