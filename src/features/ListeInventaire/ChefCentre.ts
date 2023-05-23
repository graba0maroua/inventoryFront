import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../app/services/baseQuery";

interface ChefCentre {
    COP_ID: any;
    code_bar: any;
    AST_LIB: any;
    AST_VALBASE: any;
    AST_DTE_ACQ: any;
    LOC_ID_INIT: any;
    LOC_LIB_INIT: any;
    status: any;
  }

  export const ChefCentreSlice = createApi({
    reducerPath: "inventoryList-centre",
    baseQuery:baseQueryWithReauth, 
    endpoints: (builder) => ({
      fetchChefCentre: builder.query<ChefCentre[], void>({
        query:()=>({
          url:"/inventoryList", 
          method:"GET"
      })
      }),
    }),
  });
  export const { useFetchChefCentreQuery }=ChefCentreSlice;