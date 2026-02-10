import { useUserStore, convertJobToShortCode } from '../store/useUserStore';
import { getUserInfo } from '../apis/user';
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

export const useFetchUserProfile = () => {
  const setUser = useUserStore((state) => state.setUser);

  const fetchProfile = async () => {
    try {
      const profile = await getUserInfo();

      setUser({
        name: profile.name,
        userId: profile.id,
        nickname: profile.nickname,
        job: convertJobToShortCode(profile.job),
      });

      return profile;
    } catch (error) {
      console.error('프로필 조회 실패:', error);
      throw error;
    }
  };

  return { fetchProfile };
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
