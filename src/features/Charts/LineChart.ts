import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithReauth } from "../../app/services/baseQuery";

interface LineChart {
    scanned_month:string,
    scanned_count:number,
    not_scanned_count:number
  }
export const LineChartSlice = createApi({
    reducerPath: "lineChart",
    baseQuery:baseQueryWithReauth, 
    endpoints: (builder) => ({
      fetchLineChart: builder.query<LineChart[], void>({
        query:()=>({
          url:"/lineChart", 
          method:"GET"
      })
      }),
    }),
  });
  export const {useFetchLineChartQuery}=LineChartSlice;