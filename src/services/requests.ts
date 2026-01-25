import { apiSlice } from "@/redux/api/apiSlice";

import {} from "@/models/employee";
import { RequestListResponse, RequestType } from "@/models/Requests/common";

export const requestApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    modifyRequest: builder.mutation<any, { id?: number; formData: FormData }>({
      query: ({ id, formData }) => {
        // swaps/1/status
        const url = !id ? "/admin/users" : `/admin/users/${id}`;
        return {
          url,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: (_result, _error, arg) => {
        if (arg.id) return [{ type: "requests", id: arg.id }, "requests"];
        return ["requests"];
      },
    }),
    // getUserList: builder.query<Response<PromoListResponse>, PromoListParams>({
    getRequestList: builder.query<
      //   SchedulingListResponse,
      RequestListResponse,
      { type: RequestType; page: number }
    >({
      query: ({ type }) => ({
        url: `/admin/${type}`,
      }),
      providesTags: ["requests"],
    }),
  }),
});

export const { useGetRequestListQuery } = requestApi;
