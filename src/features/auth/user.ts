import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithReauth } from "../../app/services/baseQuery";

interface UserData {
    name: string;
    matricule: string;
    email: string;
    role: number;
    structure: string;
    structure_id: number;
    created_at: string;
  }
export const UserSlice = createApi({
    reducerPath: "user",
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
      fetchUser: builder.query<UserData, void>({
        query: () => ({
          url: "/user",
          method: "GET",
        }),
      }),
    }),
  });
  
  export const { useFetchUserQuery } = UserSlice;