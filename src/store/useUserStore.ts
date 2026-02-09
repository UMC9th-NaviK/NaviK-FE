import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { JobType } from '../types/user';

interface UserState {
  userId: number | null;
  nickname: string | null;
  job: JobType | null;
  _hasHydrated: boolean;
  setUser: (data: { userId: number; nickname: string; job: JobType }) => void;
  clearUser: () => void;
  setHasHydrated: (value: boolean) => void;
}

export const convertJobToShortCode = (job: string): JobType => {
  const jobMap: Record<string, JobType> = {
    '프로덕트 매니저': 'pm',
    '프로덕트 디자이너': 'de',
    '프론트엔드 개발자': 'fe',
    '백엔드 개발자': 'be',
  };

  return jobMap[job] || 'pm';
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userId: null,
      nickname: null,
      job: null,
      _hasHydrated: false,
      setUser: (data) => set(data),
      clearUser: () => {
        set({ userId: null, nickname: null, job: null });
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      },
      setHasHydrated: (value) => set({ _hasHydrated: value }),
    }),
    {
      name: 'user',
      partialize: (state) => ({
        userId: state.userId,
        nickname: state.nickname,
        job: state.job,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true);
        }
      },
    },
  ),
);
