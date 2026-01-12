import { apiSlice } from "@/redux/api/apiSlice";

import {
  DepartmentRolesListResponse,
  RolesListResponse,
} from "@/models/shared";

export const sharedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDepartmentList: builder.query<DepartmentRolesListResponse, void>({
      query: () => ({
        url: `/admin/departments`,
      }),
    }),
    getRoleList: builder.query<RolesListResponse, void>({
      query: () => ({
        url: `/admin/roles`,
      }),
    }),
  }),
});

export const { useGetDepartmentListQuery, useGetRoleListQuery } = sharedApi;
