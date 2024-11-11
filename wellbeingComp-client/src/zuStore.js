import { create } from "zustand";
import { persist } from "zustand/middleware";

const useZuStore = create(
  persist(
    (set) => ({
      activeUser: {},
      setActiveUser: (user) => set(() => ({ activeUser: user })),
      logOut: () => set(() => ({ activeUser: {} })),
      activeUserMetrics: {},
      setActiveUserMetrics: (metrics) =>
        set(() => ({ activeUserMetrics: metrics })),
      randomCard: {},
      setRandomCard: (card) => set(() => ({ randomCard: card })),
      clearRandomCard: () => set(() => ({ randomCard: {} })),
      swipes: [],
      setSwipes: (swipes) => set(() => ({ swipes: swipes })),
      deleteASwipe: (id) =>
        set((state) => ({
          swipes: state.swipes.filter((swipe) => swipe.id !== id)
        }))
    }),
    {
      name: "junctionwellbeing", // name of the item in the storage (must be unique)
      onRehydrateStorage: () => (state) => {
        console.log("Rehydrating state:", state);
      }
    }
  )
);

export default useZuStore;
