import { apiSlice } from "@/redux/api/apiSlice";

import {
  RequestListResponse,
  RequestParams,
  RequestType,
} from "@/models/Requests/common";

export enum RequestStatusEnum {
  PENDING = 1,
  APPROVED = 2,
  REJECTED = 3,
}

export const requestApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    modifyRequestStatus: builder.mutation<
      any,
      { requestId: number; formData: FormData; type: RequestType }
    >({
      query: ({ requestId, formData }) => {
        // 1 = pending, 2 = approved, 3 = rejected
        const url = `/admin/${type}/${requestId}/status`;
        return {
          url,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: () => ["requests"],
    }),
    // getUserList: builder.query<Response<PromoListResponse>, PromoListParams>({
    getRequestList: builder.query<
      //   SchedulingListResponse,
      RequestListResponse,
      RequestParams
    >({
      query: ({ type, status }) => ({
        url: `/admin/${type}`,
        params: { status },
      }),
      providesTags: ["requests"],
    }),
  }),
});

export const { useGetRequestListQuery, useModifyRequestStatusMutation } =
  requestApi;
