import { useUserStore } from '../store/useUserStore';
import { useEffect } from 'react';
import { syncUserProfile } from '../apis/auth';

export const useUserId = () => {
  return useUserStore((state) => state.userId);
};

export const useNickname = () => {
  return useUserStore((state) => state.nickname);
};

export const useJob = () => {
  return useUserStore((state) => state.job);
};

export const useUser = () => {
  const userId = useUserStore((state) => state.userId);
  const nickname = useUserStore((state) => state.nickname);
  const job = useUserStore((state) => state.job);
  const name = useUserStore((state) => state.name);

  return { userId, nickname, job, name };
};

export const useInitUser = () => {
  const userId = useUserStore((state) => state.userId);
  const hasHydrated = useUserStore((state) => state._hasHydrated);

  useEffect(() => {
    if (hasHydrated && !userId) {
      syncUserProfile(); // 별도 함수 호출
    }
  }, [hasHydrated, userId]);
};
