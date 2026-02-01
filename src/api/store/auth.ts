import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

import type { Maybe, SigninResponse, UserProps } from "@/types";
import { COOKIE_NAME } from "@/constants/auth";

interface AuthState {
  token: string;
  user: Maybe<UserProps>;
}

const initialState: AuthState = {
  token: "",
  user: null,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signin: (state, action: PayloadAction<SigninResponse>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      if (typeof window !== "undefined") {
        Cookies.set(COOKIE_NAME, action.payload.token, {
          expires: 30, // 30 days
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });
      }
    },
    signout: (state) => {
      state.user = null;
      state.token = "";
      if (typeof window !== "undefined") {
        Cookies.remove(COOKIE_NAME);
        window.location.href = "/signin";
      }
    },
    update: (state, action: PayloadAction<{ user: UserProps }>) => {
      state.user = action.payload.user;
    },
  },
});

export const { signin, signout, update } = auth.actions;

export default auth.reducer;
