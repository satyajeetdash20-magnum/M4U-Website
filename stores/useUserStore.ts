"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface PurchaseHistoryItem {
  orderId: string;
  orderNumber: string;
  totalAmount: number;
  purchasedAt: string;
}

interface UserState {
  email: string;
  purchaseHistory: PurchaseHistoryItem[];
  setEmail: (email: string) => void;
  addPurchase: (purchase: PurchaseHistoryItem) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      email: "",
      purchaseHistory: [],
      setEmail: (email) => set({ email }),
      addPurchase: (purchase) =>
        set((state) => ({
          purchaseHistory: [purchase, ...state.purchaseHistory],
        })),
      clearUser: () => set({ email: "", purchaseHistory: [] }),
    }),
    {
      name: "m4u-user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
