import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrl } from '../../app/constantes/constantes';
import { Centre } from '../../app/models/Centre';
import { Unite } from '../../app/models/Unite';
import { StandarResponse } from '../../app/services/standardResponse';

export interface Credential {
    id: number,
    name: string,
    token: string,
    role:string
}

export interface UpPassword{
    oldpassword:string,
    password:string,
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
    constructor(
      name: string,
      email: string,
      matricule: string,
      password: string,
      role: string,
      structureId: string
    ) {
      this.name = name;
      this.email = email;
      this.matricule = matricule;
      this.password = password;
      this.role = role;
      this.structureId = structureId;
    }
    name: string;
    email: string;
    matricule: string;
    password: string;
    role: string;
    structureId: string;
  }
// export class User {
//     constructor(email: string, password: string,name:string,departement:number) {
//         this.name = name;
//         this.email = email;
//         this.password = password;
//         this.departement = departement; 
//     }
//     name:string;
//     departement:number;    
//     email: string;
//     password: string;

// }
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
                url: "register",
                method: 'post',
                body: {

                    name: credentials.name,
                    email: credentials.email,
                    matricule: credentials.matricule,
                    password: credentials.password,
                    role: credentials.role,
                    structure_id: credentials.structureId,
                }

            }),

        }),
        updatePassword: builder.mutation<StandarResponse, UpPassword>({
            query: (credentials) => ({
              url: "updatePassword",
              method: 'put',
              body: {
                oldpassword: credentials.oldpassword,
                password: credentials.password,
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
export const {useLoginMutation,useFetchInitialRegisterDataQuery,useLogoutMutation,useRegisterMutation , useUpdatePasswordMutation} = apiSlice;
