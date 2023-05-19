import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from "../../app/services/baseQuery";
interface Plan {
  GROUPE_ID: number;
  LOC_ID: string;
  COP_ID: string;
}

export const planSlice = createApi({
    reducerPath: "plan",
    baseQuery:baseQueryWithReauth, 
  endpoints: (builder) => ({
    fetchPlans: builder.query<Plan[], void>({
      query: () => ({
        url:"/inventory-plan", 
        method:"GET"
    })}),
  }),
});
export const addplanSlice = createApi({
  reducerPath: "plan",
  baseQuery:baseQueryWithReauth, 
endpoints: (builder) => ({

 fetchPlans: builder.query<Plan[], void>({
    query: () => ({
      url:"/inventory-plan", 
      method:"GET"
  })}),

  storePlan: builder.mutation<,>({

  })





}),
});

export const { useFetchPlansQuery } = planSlice;