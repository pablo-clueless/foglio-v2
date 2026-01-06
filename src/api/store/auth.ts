import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

import type { Maybe, UserProps } from "@/types";

interface AuthState {
  token: string;
  user: Maybe<UserProps>;
}

export const COOKIE_NAME = "foglio_user";
const COOKIE_EXPIRY = 7;

const getInitialToken = (): string => {
  if (typeof window !== "undefined") {
    return Cookies.get(COOKIE_NAME) || "";
  }
  return "";
};

const initialState: AuthState = {
  token: getInitialToken(),
  user: null,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signin: (state, action: PayloadAction<{ token: string; user: UserProps }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      if (action.payload.token && typeof window !== "undefined") {
        Cookies.set(COOKIE_NAME, action.payload.token, {
          expires: COOKIE_EXPIRY,
          secure: process.env.NODE_ENV === "production" && window.location.protocol === "https:",
          sameSite: "strict",
        });
      } else if (!action.payload.token && typeof window !== "undefined") {
        Cookies.remove(COOKIE_NAME);
      }
    },
    signout: (state) => {
      state.user = null;
      state.token = "";
      Cookies.remove(COOKIE_NAME);
      window.location.href = "/signin";
    },
    update: (state, action: PayloadAction<{ user: UserProps }>) => {
      state.user = action.payload.user;
    },
  },
});

export const { signin, signout, update } = auth.actions;

export default auth.reducer;
