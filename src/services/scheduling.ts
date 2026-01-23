import { apiSlice } from "@/redux/api/apiSlice";

import {} from "@/models/employee";
import { SchedulingListResponse } from "@/models/scheduling";
import { ScheduleFrequency } from "@/models/Requests/schedule";

export const schedulingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // alterUser: builder.mutation<any, { id?: number; formData: FormData }>({
    //   query: ({ id, formData }) => {
    //     const url = !id ? "/admin/users" : `/admin/users/${id}`;
    //     return {
    //       url,
    //       method: !id ? "POST" : "POST",
    //       body: formData,
    //     };
    //   },
    //   invalidatesTags: (_result, _error, arg) => {
    //     if (arg.id) return [{ type: "user", id: arg.id }, "user"];
    //     return ["user"];
    //   },
    // }),
    // getUserList: builder.query<Response<PromoListResponse>, PromoListParams>({
    getSchedulingList: builder.query<
      SchedulingListResponse,
      { frequency: ScheduleFrequency }
    >({
      query: ({ frequency }) => ({
        url: `/app/rota/${frequency}/all`,
      }),
      providesTags: ["scheduling"],
    }),

    // getUserDetails: builder.query<PromoDetailsResponse, string>({
    // getUserDetails: builder.query<EmployeeDetailsResponse, number>({
    //   query: (id) => ({
    //     url: `/admin/users/${id}`,
    //   }),
    //   providesTags: ["user"],
    // }),

    // deleteUser: builder.mutation<any, number>({
    //   query: (id) => ({
    //     url: `/admin/users/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["user"],
    // }),
  }),
});

export const { useGetSchedulingListQuery } = schedulingApi;
