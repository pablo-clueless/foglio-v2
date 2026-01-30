import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

import { PUBLIC_ROUTES } from "@/config/routes";
import type { HttpResponse } from "@/types";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,
    credentials: "same-origin",
    prepareHeaders: (headers, { endpoint }) => {
      const token = Cookies.get("FOGLIO_TOKEN");
      const isPublic = PUBLIC_ROUTES.some((path) => {
        return endpoint.toLowerCase() === path.toLowerCase();
      });
      if (token && !isPublic) {
      }
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  reducerPath: "api",
  tagTypes: ["Auth", "User", "Job", "Application", "Notification", "Subscription"],
  endpoints: (builder) => ({
    health: builder.query<HttpResponse<string>, null>({
      query: () => ({
        url: "/health",
        method: "GET",
      }),
    }),
  }),
});

export const { useHealthQuery } = api;
