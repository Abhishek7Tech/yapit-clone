import { create } from "zustand";

type Balance = {
  balance: number;
  setBalance: (newBalance: number) => void;
};

const useBalanceStore = create<Balance>((set) => ({
  balance: 0,
  setBalance: (newBalance: number) => set(() => ({ balance: newBalance })),
}));

export default useBalanceStore;