import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../app/services/baseQuery";
import { StandarResponse } from '../../app/services/standardResponse';
import { DemandeCompte } from "../../app/models/DemandeCompte";
export const AdminSlice = createApi({
    reducerPath: "admin",
    baseQuery:baseQueryWithReauth,   endpoints: (builder) => ({
       fetchDemandeCompte: builder.query<DemandeCompte[], void>({
          query: () => ({
            url:"/getDemandes", 
            method:"GET"
        })}),
     
    
    
      AcceptDemandeCompte: builder.mutation<StandarResponse,DemandeCompte>({
        query: (demande) => ({
            url: `/acceptDemandeCompte/${demande.id}`,
          method: "PUT",
        }),
      }),
    
     RefuseDemandeCompte: builder.mutation<StandarResponse, DemandeCompte>({
        query: (demande) => ({
            url: `/refuseDemandeCompte/${demande.id}`,
            method: 'PUT',
       
        }),
    
    }),
    
    
    }),
    });
    
    export const { useAcceptDemandeCompteMutation , useRefuseDemandeCompteMutation , useFetchDemandeCompteQuery } = AdminSlice;