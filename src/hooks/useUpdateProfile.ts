// hooks/useUpdateProfile.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchUserProfile } from '../apis/user';
import { useNavigate } from 'react-router-dom';
import type { UpdateProfileRequest } from '../types/user';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (body: UpdateProfileRequest) => patchUserProfile(body),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myPage'] });

      navigate('/mypage');
    },

    onError: (error) => {
      console.error('수정 실패:', error);
    },
  });
};
