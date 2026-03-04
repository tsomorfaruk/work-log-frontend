import { apiSlice } from "@/redux/api/apiSlice";

import {
  DepartmentRolesListResponse,
  RolesListResponse,
  DesignationListResponse,
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
    getDesignationList: builder.query<DesignationListResponse, void>({
      query: () => ({
        url: `/admin/designations`,
      }),
    }),
  }),
});

export const {
  useGetDepartmentListQuery,
  useGetRoleListQuery,
  useGetDesignationListQuery,
} = sharedApi;
