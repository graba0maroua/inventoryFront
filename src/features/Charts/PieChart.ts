import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithReauth } from "../../app/services/baseQuery";

interface PieChartUnite {
    center_name:string,
    scanned_count:number,
  }
interface PieChart {
  groupe_id:number,
    scanned_count:number,
  }
interface PieChartEquipe {
  EMP_FULLNAME:number,
    scanned_count:number,
  }
  
interface Progress {
  total_count: number;
  scanned_count: number;
  not_scanned_count: number;
}
export const PieChartSlice = createApi({
    reducerPath: "pieChart",
    baseQuery:baseQueryWithReauth, 
    endpoints: (builder) => ({
      fetchPieChartUnite: builder.query<PieChartUnite[], void>({
        query:()=>({
          url:"/PieChart1", 
          method:"GET"
      })
      }),
      fetchPieChartCentre: builder.query<PieChart[], void>({
        query:()=>({
          url:"/PieChart2", 
          method:"GET"
      })
      }),
      fetchPieChartEquipe: builder.query<PieChartEquipe[], void>({
        query:()=>({
          url:"/PieChart3", 
          method:"GET"
      })
      }),

      fetchProgressChart: builder.query<Progress, void>({
        query: () => ({
          url: "/Progress",
          method: "GET",
        }),
      }),
    }),
  });
  export const {useFetchPieChartUniteQuery,useFetchPieChartCentreQuery,useFetchPieChartEquipeQuery,useFetchProgressChartQuery}=PieChartSlice;