import { create } from "zustand";

interface CounterState {
  wishlistW: number;
  notifikasiN: number;
  notifikasiCN: number;
  cartC: number;
  show: boolean;
  section: number;
  incrementW: () => void;
  decrementW: () => void;
  incrementN: () => void;
  decrementN: () => void;
  incrementC: () => void;
  decrementC: () => void;
  incrementCN: () => void;
  decrementCN: () => void;
  updateShow: (newShow: boolean) => void;
  updateSection: (newSection: number) => void;
}

const useStore = create<CounterState>((set) => ({
  wishlistW: 0,
  notifikasiN: 0,
  notifikasiCN: 0,
  cartC: 0,
  show: false,
  section: 0,
  incrementW: () => set((state) => ({ wishlistW: state.wishlistW + 1 })),
  decrementW: () => set((state) => ({ wishlistW: state.wishlistW - 1 })),
  incrementN: () => set((state) => ({ notifikasiN: state.notifikasiN + 1 })),
  decrementN: () => set((state) => ({ notifikasiN: state.notifikasiN - 1 })),
  incrementC: () => set((state) => ({ cartC: state.cartC + 1 })),
  decrementC: () => set((state) => ({ cartC: state.cartC - 1 })),
  incrementCN: () => set((state) => ({ notifikasiCN: state.notifikasiCN + 1 })),
  decrementCN: () => set((state) => ({ notifikasiCN: state.notifikasiCN - 1 })),
  
  // Function to update 'show' state based on the parameter passed
  updateShow: (newShow: boolean) => set(() => ({ show: newShow })),
  updateSection: (newSection: number) => set(() => ({ section: newSection })),
}));

export default useStore;
