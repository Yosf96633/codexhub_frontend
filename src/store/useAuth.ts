import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IUser {
  username: string;
  email: string;
}

interface AuthState {
  user: IUser | null;
  isAuthenticated: boolean;
  login: (user: IUser) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) =>
        set(() => ({
          user,
          isAuthenticated: true,
        })),
      logout: () =>
        set(() => ({
          user: null,
          isAuthenticated: false,
        })),
    }),
    {
      name: "auth-storage",
    }
  )
);
