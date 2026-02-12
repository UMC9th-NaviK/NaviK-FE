import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchNotice } from '../../apis/notice';

export const useUpdateNotice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: number) => patchNotice({ notificationId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['notices'],
      });
    },
    onError: (error) => {
      console.error('Failed to update notice:', error);
    },
  });
};
