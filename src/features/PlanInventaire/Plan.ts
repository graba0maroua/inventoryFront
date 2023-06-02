import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from "../../app/services/baseQuery";
import { Plan } from "../../app/models/Plan";
import { StandarResponse } from '../../app/services/standardResponse';


export const planSlice = createApi({
    reducerPath: "plan",
    baseQuery:baseQueryWithReauth, 
  endpoints: (builder) => ({


    fetchPlans: builder.query<Plan[], {keyword:string}>({
      query: ({keyword}) => ({
        url:`/inventory-plan?keyword=${keyword}`, 
        method:"GET"
    })}),
 


  storePlan: builder.mutation<StandarResponse,Plan>({
    query: (plan) => ({
      url: "/inventory-plan",
      method: "POST",
      body: {
        GROUPE_ID:plan.GROUPE_ID,
        LOC_ID:plan.LOC_ID,
        COP_ID:plan.COP_ID
      },
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
  deletePlan : builder.mutation<StandarResponse,Plan>({
      query:({COP_ID,GROUPE_ID,LOC_ID}) => ({
        url:`/inventory-plan/${GROUPE_ID}/${LOC_ID}/${COP_ID}`,
        method:'DELETE'
      })
  })


}),
});

export const { useFetchPlansQuery , useStorePlanMutation ,useUpdatePlanMutation, useDeletePlanMutation } = planSlice;
