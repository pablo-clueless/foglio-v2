import Cookies from "js-cookie";

import type { Maybe, SigninResponse, UserProps } from "@/types";
import { createPersistMiddleware } from "./middleware";
import { COOKIE_NAME, STORAGE_KEY } from "@/constants";

const COOKIE_OPTIONS = {
  path: "/",
  sameSite: "strict" as const,
  expires: 30,
};

interface SignOutOptions {
  clearStorage?: boolean;
  redirectUrl?: string;
  soft?: boolean;
}

interface SignInOptions {
  expiresIn?: number;
  remember?: boolean;
}

interface UserStore {
  user: Maybe<UserProps>;
  signin: (payload: SigninResponse, options: SignInOptions) => void;
  signout: (option?: SignOutOptions) => void;
  setUser: (user: UserProps) => void;
}

class UserManager {
  static clearUserData(clearStorage = true) {
    Cookies.remove(COOKIE_NAME, { path: "/" });
    if (clearStorage) {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  static redirect(path = "/") {
    window.location.href = path;
  }

  static getCookieOptions(remember?: boolean, expiresIn?: number) {
    return {
      ...COOKIE_OPTIONS,
      expires: remember ? expiresIn || 30 : undefined,
    };
  }
}

const useUserStore = createPersistMiddleware<UserStore>(STORAGE_KEY, (set) => ({
  user: null,
  signin: async (payload, options = { expiresIn: 30, remember: false }) => {
    try {
      const { token, user } = payload;
      const cookieOptions = UserManager.getCookieOptions(options.remember, options.expiresIn);

      Cookies.set(COOKIE_NAME, token, cookieOptions);
      set({ user });
    } catch (error) {
      console.error("Sign in failed:", error);
      throw new Error("Failed to sign in user");
    }
  },
  signout: async (options = { redirectUrl: "/signin", soft: false, clearStorage: true }) => {
    try {
      if (options.soft) {
        set({ user: null });
        return;
      }

      const token = Cookies.get(COOKIE_NAME);
      if (!token) return;

      UserManager.clearUserData(options.clearStorage ?? true);
      set({ user: null });

      if (!options.soft) {
        UserManager.redirect(options.redirectUrl || "/signin");
      }
    } catch (error) {
      console.error("Sign out failed:", error);
      UserManager.clearUserData(options.clearStorage ?? true);
      UserManager.redirect(options.redirectUrl || "/signin");
    }
  },
  setUser: (user) => set({ user }),
}));

export { useUserStore };
