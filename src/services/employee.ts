import { apiSlice } from "@/redux/api/apiSlice";

import {
  // AlterEmployeePayload,
  EmployeeDetailsResponse,
  EmployeeListResponse,
  RotaEmployees,
} from "@/models/employee";

export const employeeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // alterUser: builder.mutation<any, AlterEmployeePayload>({
    //   query: ({ id, ...data }) => {
    //     const url = !id ? "/admin/users" : `/admin/users/${id}`;
    //     return {
    //       url,
    //       method: !id ? "post" : "post",
    //       body: data,
    //     };
    //   },
    //   invalidatesTags: (_result, _error, arg) => {
    //     if (arg.id) return [{ type: "user", id: arg.id }, "user"];
    //     return ["user"];
    //   },
    // }),
    alterUser: builder.mutation<any, { id?: number; formData: FormData }>({
      query: ({ id, formData }) => {
        const url = !id ? "/admin/users" : `/admin/users/${id}`;
        return {
          url,
          method: !id ? "POST" : "POST",
          body: formData,
        };
      },
      invalidatesTags: (_result, _error, arg) => {
        if (arg.id) return [{ type: "user", id: arg.id }, "user"];
        return ["user"];
      },
    }),
    // getUserList: builder.query<Response<PromoListResponse>, PromoListParams>({
    getUserList: builder.query<EmployeeListResponse, { page?: number }>({
      query: (params) => ({
        url: `/admin/users`,
        params,
      }),
      providesTags: ["user"],
    }),
    getScheduleUserList: builder.query<RotaEmployees, { page?: number }>({
      query: (params) => ({
        url: `/admin/users/listSimple`,
        params,
      }),
      providesTags: ["user"],
    }),

    // getUserDetails: builder.query<PromoDetailsResponse, string>({
    getUserDetails: builder.query<EmployeeDetailsResponse, number>({
      query: (id) => ({
        url: `/admin/users/${id}`,
      }),
      providesTags: ["user"],
    }),

    deleteUser: builder.mutation<any, number>({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useAlterUserMutation,
  useGetUserListQuery,
  useGetUserDetailsQuery,
  useDeleteUserMutation,
  useGetScheduleUserListQuery,
} = employeeApi;
