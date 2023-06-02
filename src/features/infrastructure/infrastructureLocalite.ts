import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../app/services/baseQuery";
interface InfrastructureLocalite {
  locality_id: string;
  locality_name: string;
  total_count: number;
  scanned_count: number;
  not_scanned_count: number;
  percentage: string;
}

export const infrastructureLocaliteSlice = createApi({
  reducerPath: "infrastructureLocalite",
  baseQuery:baseQueryWithReauth, 
  endpoints: (builder) => ({
    fetchInfrastructureLocalite: builder.query<InfrastructureLocalite[], void>({
      query:()=>({
        url:"/infrastructureLocalite", 
        method:"GET"
    })
    }),
    generatePDFLocalites:builder.mutation<{pdf_url:string},{}>({
      query:()=> ({
        url:'/export/infrastructurelocalite',
        method:'GET'
      })
    })
  }),
});

export const { useFetchInfrastructureLocaliteQuery,useGeneratePDFLocalitesMutation } =infrastructureLocaliteSlice;