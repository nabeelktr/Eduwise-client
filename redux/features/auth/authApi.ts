import { url } from "inspector";
import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userRegistration } from "./authSlice";

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
                console.log(e);
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
                        accessToken: result.data.data.accessToken,
                        user: result.data.data.user,
                    })
                )
            }catch(e: any){
                console.log(e);
            }
        }
    })
    })
})

export const {useRegisterMutation, useActivationMutation, useLoginMutation} = authApi;