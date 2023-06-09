import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../app/services/baseQuery";
interface Localite {
  LOC_LIB:string,
  LOC_ID: string;

}
export const localiteSlice = createApi({
  reducerPath: "localiteSlice",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    fetchVisitedLocalite: builder.query<Localite, void>({
      query: () => ({
        url: "/localiteVisite",
        method: "GET",
      }),
    }),
    fetchNotVisitedLocalite: builder.query<Localite, void>({
      query: () => ({
        url: "/NotVisited_Localites",
        method: "GET",
      }),
    }),
  }),
});

export const { useFetchNotVisitedLocaliteQuery, useFetchVisitedLocaliteQuery } =
  localiteSlice;
