import { create } from 'zustand';

interface PortfolioStore {
  portfolioId: number | null;
  setPortfolioId: (id: number) => void;
  resetPortfolioId: () => void;
}

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  portfolioId: null,
  setPortfolioId: (id) => set({ portfolioId: id }),
  resetPortfolioId: () => set({ portfolioId: null }),
}));
