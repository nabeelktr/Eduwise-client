"use server"
import { cookies } from "next/headers";
import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userLoggedOut, userRegistration } from "./authSlice";
import { signOut } from "next-auth/react";

type RegistrationResponse = {
    message: string;
    data: {
        token: string
    };
}

type RegistrationData = {};

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
    //endpoints
    register: builder.mutation<RegistrationResponse, RegistrationData>({
        query: (data) => ({
            url: "user/register",
            method: "POST",
            body: data,
            credentials: "include" as const,
        }),
        async onQueryStarted(arg, {queryFulfilled, dispatch}){
            try{
                const result = await queryFulfilled;
                dispatch(
                    userRegistration({
                        token: result.data.data.token,
                    })
                )
            }catch(e: any){
                console.log(e?.error?.data);
            }
        }
    }),

    activation: builder.mutation({
        query: ({token, activationCode}) => ({
            url: "user/activate",
            method: "POST",
            body: {
                token, 
                activationCode
            }
        })
    }),

    login: builder.mutation({
        query: ({email, password}) => ({
            url: "user/login",
            method: "POST",
            body:{
                email,
                password
            },
            credentials: "include" as const
        }),  
        async onQueryStarted(arg, {queryFulfilled, dispatch}){
            try{
                const result = await queryFulfilled;
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

    socialAuth: builder.mutation({
        query: ({email, name, avatar}) => ({
            url: "user/social-auth",
            method: "POST",
            body:{
                email,
                name,
                avatar
            },
            credentials: "include" as const
        }),  
        async onQueryStarted(arg, {queryFulfilled, dispatch}){
            try{
                const result = await queryFulfilled;
                dispatch(
                    userLoggedIn({
                        accessToken: result.data.accessToken,
                        user: result.data.user,
                    })
                )
            }catch(e: any){
                await signOut()
                dispatch(
                    userLoggedOut()
                )
                console.log(e?.error?.data);
            }
        }
    }),

    logOut: builder.mutation({
        query: ({id}) => ({
            url: "user/logout",
            method: "GET",
            credentials: "include" as const
        }),  
        async onQueryStarted(arg, { dispatch }) {
            try {
                const cookieStore = cookies()
                dispatch(userLoggedOut());
                cookieStore.getAll().forEach((cookie) => {
                    cookieStore.delete(cookie.name);
                  });
                await signOut()
            } catch (error: any) {
                dispatch(userLoggedOut());
                console.error("Error during logout:", error);
            }
        }
    }),

    })
})

export const {useRegisterMutation, useActivationMutation, useLoginMutation, useSocialAuthMutation, useLogOutMutation} = authApi;