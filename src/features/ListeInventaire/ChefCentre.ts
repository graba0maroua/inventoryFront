import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../app/services/baseQuery";

interface ChefCentre {
    COP_ID: string;
    code_bar: string;
    AST_LIB: string;
    AST_VALBASE: number;
    AST_DTE_ACQ: Date;
    LOC_ID_INIT: string;
    LOC_LIB_INIT: string;
    status: string;
  }
  

  export const ChefCentreSlice = createApi({
    reducerPath: "inventoryList-centre",
    baseQuery:baseQueryWithReauth, 
    endpoints: (builder) => ({
      fetchChefCentre: builder.query<ChefCentre[], void>({
        query:()=>({
          url:"/listCentre", 
          method:"GET"
      })
      }),
    }),
  });
  export const { useFetchChefCentreQuery }=ChefCentreSlice;