import { apiSlice } from "../api/apiSlice";

export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "admin/get-users",
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `admin/delete-user/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),

    getInstructors: builder.query({
      query: () => ({
        url: "admin/get-instructors",
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    getFAQ: builder.query({
      query: () => ({
        url: "admin/get-FAQ",
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    addFAQ: builder.mutation({
      query: (questions) => ({
        url: "admin/add-faq",
        method: "POST",
        credentials: "include" as const,
      })
    })
  }),
});

export const {
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetInstructorsQuery,
  useGetFAQQuery,
  useAddFAQMutation
} = adminApi;
