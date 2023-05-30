import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../app/services/baseQuery";

interface ChefUnite {
    COP_ID:string,
    AST_ID: string;
    code_bar: string;
    AST_LIB: string;
    AST_VALBASE: number;
    AST_DTE_ACQ: Date;
    LOC_ID_INIT: string;
    LOC_LIB_INIT: string;
    status: string;
  }
  
  export const ChefUniteSlice = createApi({
    reducerPath: "inventoryList-unite",
    baseQuery:baseQueryWithReauth, 
    endpoints: (builder) => ({
      fetchChefUnite: builder.query<ChefUnite[], void>({
        query:()=>({
          url:"/listUnite", 
          method:"GET"
      })
      }),
    }),
  });
  export const { useFetchChefUniteQuery }=ChefUniteSlice;