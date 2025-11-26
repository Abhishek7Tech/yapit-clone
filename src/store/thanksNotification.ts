import { create } from "zustand";

type Notification = {
  thanksNotification: boolean;
  toggleThanksNotification: (status: boolean) => void;
};

const useNotificationStore = create<Notification>((set) => ({
  thanksNotification: false,
  toggleThanksNotification: (status: boolean) =>
    set((state) => ({
      thanksNotification: state.thanksNotification = status,
    })),
}));

export default useNotificationStore;
