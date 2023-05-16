import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithReauth } from "../../app/services/baseQuery";
import { Centre } from "../../app/models/Centre";

export const centreSlice = createApi({
    reducerPath:"centre",
    baseQuery:baseQueryWithReauth,
    endpoints:(builder)=>({
        fetchCentre:builder.query<{centres:Centre[]},{keyword:string}>({
            query:({keyword})=>({
                url:`/centres?keyword=${keyword}`,
                method:"GET"
            })
        }),
       
    })
})

export const {useFetchCentreQuery} = centreSlice