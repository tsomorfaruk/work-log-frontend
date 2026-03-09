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
    alterFloor: builder.mutation<FloorResponse, AlterFloorPayload>({
      query: ({ id, ...body }) => {
        const url = !id ? `/admin/floors` : `/admin/floors/${id}`;
        return {
          url,
          method: !id ? "POST" : "PUT",
          body,
        };
      },
      invalidatesTags: (_result, _error, arg) => {
        if (arg.id) return [{ type: "floor" as const, id: arg.id }, "floor"];
        return ["floor"];
      },
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
  useAlterFloorMutation,
  useDeleteFloorMutation,
} = floorApi;
