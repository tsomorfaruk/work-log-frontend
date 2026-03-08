import { apiSlice } from "@/redux/api/apiSlice";

import {
  DepartmentRolesListResponse,
  RolesListResponse,
  DesignationListResponse,
  BranchListResponse,
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
    getBranchList: builder.query<BranchListResponse, void>({
      query: () => ({
        url: `/admin/branches`,
      }),
    }),
  }),
});

export const {
  useGetDepartmentListQuery,
  useGetRoleListQuery,
  useGetDesignationListQuery,
  useGetBranchListQuery,
} = sharedApi;
