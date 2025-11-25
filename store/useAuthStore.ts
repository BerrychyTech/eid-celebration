// File: store/useAuthStore.ts
"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type User = {
  fullName?: string;
  email: string;
  [key: string]: any;
};

type AuthStore = {
  user: User | null;
  token: string | null;
  hasHydrated: boolean;
  setHasHydrated: (val: boolean) => void;

  login: (user: User, token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,

      hasHydrated: false,
      setHasHydrated: (val) => set({ hasHydrated: val }),

      login: (user, token) => {
        set({ user, token });
      },

      logout: () => {
        set({ user: null, token: null });
      },
    }),
    {
      name: "token",

      // 🚀 Safe storage handler for Next.js
      storage: createJSONStorage(() => localStorage),

      // 🚀 Hydration detection
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
