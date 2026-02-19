import { useNavigate } from "react-router-dom"
import GoalsNavbar from "../../components/goals/GoalsNavbar"
import TodoList from "../../components/goals/TodoList"
import { useEffect, useRef, useState } from "react";
import { getGoalsList } from "../../apis/goals/goals";
import { useInfiniteQuery } from "@tanstack/react-query";

const SettingGoalsPage = () => {
    const navigate = useNavigate();
    const observerRef = useRef<HTMLDivElement>(null);

    const [pageSize] = useState(10);
    const [sortBy] = useState("RECENT");

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
        queryKey : ['goals', sortBy, pageSize],
        queryFn : ({ pageParam }) => getGoalsList(pageParam as number, pageSize, sortBy),
        initialPageParam : undefined as number | undefined,
        getNextPageParam : (lastPage) => {
            if (!lastPage.result.hasNext || lastPage.result.nextCursor === "null") {
                return undefined;
            }

            return lastPage.result.nextCursor;
        }
    })

    useEffect(() => {
        if (!hasNextPage || !fetchNextPage) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },

            { threshold : 0.1 }
        )

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => observer.disconnect();
    }, [hasNextPage, fetchNextPage, isFetchingNextPage])

    const goalsList = data?.pages.flatMap(page => page.result.content) || [];

    return (
        <div className="min-h-screen relative overflow-x-hidden bg-slate-50">
            <GoalsNavbar goalId={0} />

            <div className="absolute w-[628px] h-[628px] left-[calc(50%-628px/2+0.5px)] top-[calc(50%-628px/2+73px)] bg-[radial-gradient(50%_50%_at_50%_50%,#94BBFD_0%,rgba(184,212,254,0)_100%)] z-10 pointer-events-none"></div>

            <div className="flex flex-col p-[16px]">
                <div className="flex flex-col gap-[16px]">
                    <div className="relative flex flex-col p-[16px] gap-[10px] rounded-[16px] bg-linear-to-b from-[#94BBFD] to-[#4E83F9]">
                        <div className="relative z-10 flex flex-col gap-[8px]">
                            <p className="text-caption-12M text-base-100"> 연구에 따르면, 목표를 글로 적은 사람은 <br /> 머릿속에만 둔 사람보다 달성률이 <span className="text-caption-12B"> 42% </span> 더 높아진다고 해요. </p>
                            <p className="text-caption-12B text-base-100"> 지금 떠오르는 목표를 가볍게 한 줄로 적어보세요. <br /> 그 순간부터 행동이 시작되고, 성장의 첫 계단이 만들어집니다. </p>
                        </div>
                        <img 
                        src="/images/goals/logo.png"
                        alt="나빅 로고"
                        className="absolute z-20 top-[5px] right-[5px] w-[105px] h-[105px]"
                        />
                    </div>

                    <div className="flex flex-col gap-[12px] z-20">
                        <div className='h-[420px] flex flex-col bg-[#FFFFFFB2] rounded-[8px] border-[1px] border-base-100 shadow-[0_0_10px_0_#DBEBFE]'>
                            <div className='flex flex-col scrollbar-hide overflow-y-auto justify-between p-[16px] gap-[16px]'>
                                { isLoading ? (
                                    <>
                                        <p className="text-center text-caption-12M text-slate-400"> 불러오는 중... </p>
                                    </>
                                ) : (
                                    <div className="flex flex-col gap-[12px]">
                                        {goalsList.map((goal) => (
                                            <TodoList key={goal.goalId} goalId={goal.goalId} title={goal.title} initialStatus={goal.status} content={goal.content} endDate={goal.endDate} />
                                        ))}

                                        <div ref={observerRef}>
                                            {isFetchingNextPage}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end w-full"> 
                            <button 
                            onClick={() => navigate("/goals/add")}
                            className="flex items-center justify-center w-[100px] h-[38px] rounded-[8px] py-[8px] gap-[10px] bg-primary-blue-500">
                                <p className="text-body-14B text-base-100">
                                    목표 추가
                                </p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingGoalsPage
