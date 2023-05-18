import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithReauth } from "../../app/services/baseQuery";
import { Centre } from "../../app/models/Centre";

export const centreSlice = createApi({
    reducerPath:"centre",  // "centre", which defines the name of the reducer slice in the store
    baseQuery:baseQueryWithReauth, //baseQuery is set to baseQueryWithReauth, which represents the base query function with authentication.
    endpoints:(builder)=>({ //endpoints define the available endpoints for the Centre API slice
        fetchCentre:builder.query<{centres:Centre[]},{keyword:string}>({ //fetchCentre is an endpoint created using the builder.query method. It specifies the expected response shape and the parameters.
            query:({keyword})=>({
                url:`/centres?keyword=${keyword}`, //The fetchCentre endpoint's query function takes a keyword parameter and generates a GET request to /centres with the keyword as a query parameter.
                method:"GET"
            })
        }),
       
    })
})

export const {useFetchCentreQuery} = centreSlice