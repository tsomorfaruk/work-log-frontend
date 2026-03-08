import { apiSlice } from "@/redux/api/apiSlice";
import {
  FloorListResponse,
  FloorResponse,
  AlterFloorPayload,
} from "@/models/floor";

export const floorApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFloorList: builder.query<FloorListResponse, { page?: number }>({
      query: (params) => ({
        url: `/admin/floors`,
        params,
      }),
      providesTags: ["floor"],
    }),
    storeFloor: builder.mutation<FloorResponse, AlterFloorPayload>({
      query: (body) => ({
        url: `/admin/floors`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["floor"],
    }),
    updateFloor: builder.mutation<FloorResponse, AlterFloorPayload>({
      query: ({ id, ...body }) => ({
        url: `/admin/floors/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["floor"],
    }),
    deleteFloor: builder.mutation<ApiResponse, number>({
      query: (id) => ({
        url: `/admin/floors/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["floor"],
    }),
  }),
});

import { ApiResponse } from "@/models/common";

export const {
  useGetFloorListQuery,
  useStoreFloorMutation,
  useUpdateFloorMutation,
  useDeleteFloorMutation,
} = floorApi;
