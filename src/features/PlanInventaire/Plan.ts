import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from "../../app/services/baseQuery";
import { Plan } from "../../app/models/Plan";


export const planSlice = createApi({
    reducerPath: "plan",
    baseQuery:baseQueryWithReauth, 
  endpoints: (builder) => ({


    fetchPlans: builder.query<Plan[], void>({
      query: () => ({
        url:"/inventory-plan", 
        method:"GET"
    })}),
 


  storePlan: builder.mutation<Plan, Partial<Plan>>({
    query: (plan) => ({
      url: "/inventory-plan",
      method: "POST",
      body: plan,
    }),
  }),




}),
});

export const { useFetchPlansQuery , useStorePlanMutation  } = planSlice;
