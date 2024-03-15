import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../auth/authSlice";
import { signOut } from "next-auth/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,
    }),
    endpoints: (builder) => ({

        refreshToken: builder.query({
            query: (data) => ({
            url: "auth/refreshToken",
            method: "GET",
            credentials: "include" as const,
        })
        }),

        loadUser: builder.query({
            query: (data) => ({
                url: "user/me",
                method: "GET",
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    const result = await queryFulfilled;
                    console.log(result);
                    dispatch(
                        userLoggedIn({
                            accessToken: result.data.accessToken,
                            user: result.data.user,
                        })
                    )
                }catch(e: any){
                    console.log(e?.error?.data);
                }
            }
        }),

    })
})

export const {useRefreshTokenQuery, useLoadUserQuery} = apiSlice;