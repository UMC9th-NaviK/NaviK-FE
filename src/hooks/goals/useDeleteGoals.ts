import { useQueryClient, useMutation } from '@tanstack/react-query';
import { deleteGoals } from '../../apis/goals/goals';

const useDeleteGoals = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn : (goalId : number) => deleteGoals(goalId),
        onSuccess : () => {
            queryClient.invalidateQueries({ queryKey : ['goals'] })
        },
        onError : (error) => {
            console.log("목표 삭제 실패", error);
        }
    })
}

export default useDeleteGoals
