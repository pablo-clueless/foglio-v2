import { api } from "./api";

const websocket = api.injectEndpoints({
  endpoints: (builder) => ({
    getWsStats: builder.query({
      query: () => ({
        url: "/ws/stats",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetWsStatsQuery } = websocket;
