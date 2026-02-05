import { useState } from "react";

type TodoStatus = 'none' | 'done' | 'fail';

const TodoList = () => {
    const [status, setStatus] = useState<TodoStatus>('none');

    const handleToggle = () => {
        if (status === 'none') setStatus('done');
        else if (status === 'done') setStatus('fail');
        else setStatus('none');
    };
    
    return (
        <div 
        onClick={handleToggle}
        className="group flex items-center justify-between w-full h-[24px] cursor-pointer">
            <span className={`text-body-14M 
                ${
                    status === 'done' ? 'text-[#11111166]' : 'text-base-900'
                }`}>
                사용자 피드백 10명 → 프로토타입 2차 개편
            </span>

            <div className="relative flex items-center justify-center w-[18px] h-[18px]">
                <input 
                type="checkbox" 
                className="peer appearance-none w-full h-full rounded-[2px] bg-[#4E83F9] transition-all" />

                <div className={`absolute inset-0 rounded-[2px] transition-colors 
                ${
                    status === 'none' ? 'bg-primary-blue-500' : 
                    status === 'done' ? 'bg-base-400' : 'bg-[#E72326]'
                }`} />

                {status === 'none' && (
                    <div className="absolute w-[8px] h-[8px] bg-white rounded-full" />
                )}

                {status === 'done' && (
                    <svg className="absolute w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                        <path strokeLinecap="square" strokeLinejoin="miter" d="M5 13l4 4L19 7" />
                    </svg>
                )}

                {status === 'fail' && (
                    <svg className="absolute w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                        <path strokeLinecap="square" strokeLinejoin="miter" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                )}
            </div>
        </div>
    )
}

export default TodoList
