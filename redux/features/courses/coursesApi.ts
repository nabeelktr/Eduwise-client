import { apiSlice } from "../api/apiSlice";

export const coursesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: ( formData ) => ({
        url: "courses/create-course",
        method: "POST",
        body:  formData ,
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useCreateCourseMutation } = coursesApi;
