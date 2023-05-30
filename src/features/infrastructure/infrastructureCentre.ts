import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../app/services/baseQuery";
interface InfrastructureCentre {
    center_id: string;
    center_name: string;
    total_count: number;
    scanned_count: number;
    not_scanned_count: number;
    percentage: string;
  }
  export const InfrastructureCentreSlice = createApi({
    reducerPath: "infrastructureCentre",
    baseQuery:baseQueryWithReauth, 
    endpoints: (builder) => ({
      fetchInfrastructureCentre: builder.query<InfrastructureCentre[], void>({
        query:()=>({
          url:"/infrastructureCentre", 
          method:"GET"
      })
      }),
    }),
  });

  export const {useFetchInfrastructureCentreQuery}=InfrastructureCentreSlice;