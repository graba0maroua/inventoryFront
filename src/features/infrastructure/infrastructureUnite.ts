import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../app/services/baseQuery";
interface InfrastructureUnite {
    unit_id: string;
    unit_name: string;
    total_count: number;
    scanned_count: number;
    not_scanned_count: number;
    percentage: string;
  }
  export const InfrastructureUniteSlice = createApi({
    reducerPath: "infrastructureUnite",
    baseQuery:baseQueryWithReauth, 
    endpoints: (builder) => ({
      fetchInfrastructureUnite: builder.query<InfrastructureUnite[], void>({
        query:()=>({
          url:"/infrastructureUnite", 
          method:"GET"
      })
      }),
    }),
  });
  export const {useFetchInfrastructureUniteQuery }=InfrastructureUniteSlice;