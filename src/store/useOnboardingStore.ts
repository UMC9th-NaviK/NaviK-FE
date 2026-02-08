import { create } from 'zustand';

interface OnboardingData {
  name: string;
  nickname: string;
  isEntryLevel: boolean;
}

interface OnboardingState {
  data: OnboardingData;
  setBasicInfo: (info: OnboardingData) => void;
  reset: () => void;
}

const initialData: OnboardingData = {
  name: '',
  nickname: '',
  isEntryLevel: true,
};

export const useOnboardingStore = create<OnboardingState>((set) => ({
  data: initialData,
  setBasicInfo: (info) => set({ data: info }),
  reset: () => set({ data: initialData }),
}));
