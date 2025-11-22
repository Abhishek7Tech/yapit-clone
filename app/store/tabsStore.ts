import { create } from "zustand";

type ShowTabs = {
  showTabs: boolean;
  setShowTabs: (showTab: boolean) => void;
};

const useTabsStore = create<ShowTabs>((set) => ({
  showTabs: true,
  setShowTabs: (showTab: boolean) => set(() => ({ showTabs: showTab })),
}));

export default useTabsStore;