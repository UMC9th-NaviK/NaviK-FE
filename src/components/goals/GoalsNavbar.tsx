import { useLocation, useNavigate } from 'react-router-dom';
import useDeleteGoals from '../../hooks/goals/useDeleteGoals';

interface GoalsNavbarProps {
    goalId : number;
    goalTitle? : string;
    content? : string;
    endDate? : string;
}

const GoalsNavbar = ({ goalId } : GoalsNavbarProps) => {
    const location = useLocation();
    const navigate = useNavigate();

    const { mutate } = useDeleteGoals();

    const title : Record<string, string> = {
        '/goals' : '목표 설정',
        '/goals/modify' : '목표 수정하기',
        '/goals/add' : '목표 추가하기',
    }

    const getTitle = title[location.pathname];

    const deleteIcon = location.pathname === '/goals/modify';

    const handleDeleteGoals = () => {
        if (!goalId || goalId === 0) {
            return;
        }

        mutate(goalId, {
            onSuccess : () => {
                navigate('/goals');
            }
        });
    }

    const handleClick = () => {
        if (location.pathname === '/goals') {
            navigate('/report');
        }

        else {
            navigate('/goals');
        }
    }

    return (
        <nav className='flex bg-white items-center p-[24px] gap-[10px]'>
            <div className='flex flex-1 items-center justify-between'>
                <button
                onClick={handleClick}>
                    <img 
                    src="/icons/reports/prevButton.svg"
                    alt="뒤로가기 버튼"
                    className='w-[24px] h-[24px]'
                    />
                </button>
                <h1 className='text-heading-20B'> { getTitle } </h1>
                
                <div className='w-[24px] h-[24px] flex items-center justify-center'>
                    {deleteIcon && (
                        <button onClick={handleDeleteGoals}>
                            <img 
                                src="/icons/goals/material-symbols_delete-outline-rounded.svg" 
                                alt="삭제 버튼"
                                className='w-[24px] h-[24px]' 
                            />
                        </button>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default GoalsNavbar
