import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../app/services/baseQuery";

interface ChefEquipe {
    COP_ID: string;
    AST_ID:string,
    code_bar: string;
    AST_LIB: string;
    AST_VALBASE: number;
    AST_DTE_ACQ: Date;
    LOC_ID_INIT: string;
    LOC_LIB_INIT: string;
    status: string;
  }
  
  export const ChefEquipeSlice = createApi({
    reducerPath: "inventoryList-equipe",
    baseQuery:baseQueryWithReauth, 
    endpoints: (builder) => ({
      fetchChefEquipe: builder.query<ChefEquipe[], void>({
        query:()=>({
          url:"/listLocalite", 
          method:"GET"
      })
      }),
    }),
  });
  export const { useFetchChefEquipeQuery }=ChefEquipeSlice;