import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrl } from '../../app/constantes/constantes';
import { Centre } from '../../app/models/Centre';
import { Unite } from '../../app/models/Unite';

export interface Credential {
    id: number,
    name: string,
    token: string,
    role:string
}
interface LogoutResponse{
    success:boolean
}
export class loginParams {
    constructor(matricule: string, password: string) {
        this.matricule = matricule;
        this.password = password;
    }
    matricule: string;
    password: string;

}
export class User {
    constructor(email: string, password: string,name:string,departement:number) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.departement = departement; //! je change ca to my user? 
    }
    name:string;
    departement:number;    
    email: string;
    password: string;

}
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders: (headers, { getState }) => {
            const token = localStorage.getItem('token');
            
            // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                
              headers.set('authorization', `Bearer ${token}`);
              headers.set('Accept', 'application/json');


            }
        
            return headers
          },
        

    }),
    endpoints: (builder) => ({

        login: builder.mutation<Credential, loginParams>({
            query: (credentials) => ({
                url: "login",
                method: 'post',
                body: {
                    matricule: credentials.matricule,
                    password: credentials.password
                },
                

            }),

        }),
        register: builder.mutation<Credential, User>({
            query: (credentials) => ({
                url: "auth/register",
                method: 'post',
                body: {
                    name:credentials.name,
                    email: credentials.email,
                    password: credentials.password,
                    departement: credentials.departement
                },
                

            }),

        }),
        logout: builder.mutation<LogoutResponse,string>({
            query: () => ({
                url: "logout",
                method: 'POST',
                responseHandler:(response)=>{

                    return response.text();
                }

            }),
            
        }),
        fetchInitialRegisterData:builder.query<{centres:Centre[],unites:Unite[]},{}>({
            query:()=>({
                url:'getcentre',
                method:"GET"
                
            })
        })



    })

})
export const {useLoginMutation,useFetchInitialRegisterDataQuery,useLogoutMutation,useRegisterMutation} = apiSlice;
