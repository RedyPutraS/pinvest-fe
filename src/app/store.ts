import { create } from "zustand";

interface CounterState {
  wishlistW: number;
  notifikasiN: number;
  cartC: number;
  incrementW: () => void;
  decrementW: () => void;
  incrementN: () => void;
  decrementN: () => void;
  incrementC: () => void;
  decrementC: () => void;
}

const useStore = create<CounterState>((set) => ({
  wishlistW: 0,
  notifikasiN: 0,
  cartC: 0,
  incrementW: () => set((state) => ({ wishlistW: state.wishlistW + 1 })),
  decrementW: () => set((state) => ({ wishlistW: state.wishlistW - 1 })),
  incrementN: () => set((state) => ({ notifikasiN: state.notifikasiN + 1 })),
  decrementN: () => set((state) => ({ notifikasiN: state.notifikasiN - 1 })),
  incrementC: () => set((state) => ({ cartC: state.cartC + 1 })),
  decrementC: () => set((state) => ({ cartC: state.cartC - 1 })),
}));

export default useStore;
