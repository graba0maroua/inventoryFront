import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from "../../app/services/baseQuery";
import { Plan } from "../../app/models/Plan";
import { StandarResponse } from '../../app/services/standardResponse';


export const planSlice = createApi({
    reducerPath: "plan",
    baseQuery:baseQueryWithReauth, 
  endpoints: (builder) => ({


    fetchPlans: builder.query<Plan[], void>({
      query: () => ({
        url:"/inventory-plan", 
        method:"GET"
    })}),
 


  storePlan: builder.mutation<StandarResponse,Plan>({
    query: (plan) => ({
      url: "/inventory-plan",
      method: "POST",
      body: plan,
    }),
  }),

  updatePlan: builder.mutation<StandarResponse, Plan>({
    query: (plan) => ({
        url: `/inventory-plan/${plan.GROUPE_ID}`,
        method: 'PUT',
        body: {
          GROUPE_ID: plan.GROUPE_ID,
          LOC_ID: plan.LOC_ID,
          COP_ID: plan.COP_ID,
        },
    }),

}),


}),
});

export const { useFetchPlansQuery , useStorePlanMutation ,useUpdatePlanMutation } = planSlice;
