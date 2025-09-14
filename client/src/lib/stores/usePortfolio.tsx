import { create } from "zustand";

export type PortfolioSection = "about" | "projects" | "skills" | "contact";

interface PortfolioState {
  activeSection: PortfolioSection | null;
  
  // Actions
  openSection: (section: PortfolioSection) => void;
  closeSection: () => void;
}

export const usePortfolio = create<PortfolioState>((set) => ({
  activeSection: null,
  
  openSection: (section) => {
    console.log(`Opening portfolio section: ${section}`);
    set({ activeSection: section });
  },
  
  closeSection: () => {
    console.log('Closing portfolio section');
    set({ activeSection: null });
  }
}));
