import { apiSlice } from "../api/apiSlice";

export const coursesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (formData) => ({
        url: "courses/create-course",
        method: "POST",
        body: formData,
        credentials: "include" as const,
      }),
    }),

    getCourses: builder.query({
      query: () => ({
        url: "courses/get-courses",
        method: "GET",
        credentials: "include" as const,
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }),
    }),

    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `courses/delete-course/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),

    updateCourse: builder.mutation({
      query: (formData) => ({
        url: "courses/update-course",
        method: "POST",
        body: formData,
        credentials: "include" as const,
      }),
    }),

    getTrendingCourses: builder.mutation({
      query: () => ({
        url: "courses/get-trending-courses",
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    getCourseDetails: builder.query({
      query: (id:any) => ({
        url: `courses/get-course-wop/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    getUsersCourse: builder.query({
      query: () => ({
        url: "admin/get-users",
        method: "GET",
        credentials: "include" as const,
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }),
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetCoursesQuery,
  useDeleteCourseMutation,
  useUpdateCourseMutation,
  useGetTrendingCoursesMutation,
  useGetCourseDetailsQuery,
  useGetUsersCourseQuery
} = coursesApi;
