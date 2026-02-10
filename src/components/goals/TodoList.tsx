import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { GoalsStatus } from "../../types/goals";
import { patchGoalsStatus } from "../../apis/goals/goals";
import { useNavigate } from "react-router-dom";

interface TodoListProps {
    goalId: number;
    title : string;
    initialStatus: GoalsStatus;
    content: string;
    endDate : string;
}

const TodoList = ({ goalId, title, initialStatus, content , endDate }: TodoListProps) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [status, setStatus] = useState<GoalsStatus>(initialStatus);

    const { mutate } = useMutation({
        mutationFn: (nextStatus: GoalsStatus) => patchGoalsStatus(goalId, nextStatus),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["goals"] });
        },
        onError: (error) => {
            console.error("상태 변경 실패:", error);

            setStatus(initialStatus);
        },
    });
    
    const handleToggle = () => {
        let nextStatus: GoalsStatus;

        if (status === 'NONE') nextStatus = 'IN_PROGRESS';
        else if (status === 'IN_PROGRESS') nextStatus = 'COMPLETED';
        else if (status === 'COMPLETED') nextStatus = 'FAILED';
        else nextStatus = 'NONE';
    
        setStatus(nextStatus);

        mutate(nextStatus);
    };

    const handleModifyGoals = (e : React.MouseEvent) => {
        e.stopPropagation();

        navigate('/goals/modify', { state : {goalId, title, content, endDate} });
    }
    
    return (
        <button 
        onClick={handleToggle}
        className="group flex items-center justify-between w-full h-[24px] cursor-pointer">
            <button
            onClick={handleModifyGoals}>
                <span className={`text-body-14M ${ status === 'COMPLETED' ? 'text-[#11111166]' : 'text-base-900'}`}>
                    { title }
                </span>
            </button>

            <div className="relative flex items-center justify-center w-[18px] h-[18px]">
                <input 
                type="checkbox" 
                className="peer appearance-none w-full h-full rounded-[2px] bg-[#4E83F9] transition-all" />

                <div className={`absolute inset-0 rounded-[2px] transition-colors 
                ${
                    (status === 'NONE' || status === 'IN_PROGRESS') ? 'bg-primary-blue-500' : 
                    status === 'COMPLETED' ? 'bg-base-400' : 'bg-[#E72326]'
                }`} />

                {status === 'NONE' && (
                    <div />
                )}

                {status === 'COMPLETED' && (
                    <svg className="absolute w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                        <path strokeLinecap="square" strokeLinejoin="miter" d="M5 13l4 4L19 7" />
                    </svg>
                )}

                {status === 'FAILED' && (
                    <svg className="absolute w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                        <path strokeLinecap="square" strokeLinejoin="miter" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                )}

                {status === 'IN_PROGRESS' && (
                    <div className="absolute w-[8px] h-[8px] bg-white rounded-full" />
                )}
            </div>
        </button>
    )
}

export default TodoList
