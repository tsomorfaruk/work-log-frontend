import { ApiResponse } from "@/classes/ApiResponse";
import React from "react";

export interface DefaultProps {
  children?: React.ReactElement | React.ReactElement[] | string;
  className?: string;
}

export type QueryObj = Record<string, unknown>;
export type PathParams = Record<string, string | number | undefined>;

export interface UseApiConfig {
  endpoint?: string;
  method?: "get" | "post" | "put" | "patch" | "delete";
  query?: QueryObj;
  pathParams?: PathParams;
  options?: Record<string, unknown>;
}

export interface ApiHookState<T> {
  isLoading: boolean;
  hasError: unknown;
  result: ApiResponse<T>;
}

export type UpdateQueryType = QueryObj | ((prev: QueryObj) => QueryObj);

export interface AuthState {
  token: string | null;
  user: { id: string | null; name: string } | null; // <- Replace `any` with your User type later
}

export interface AuthContextType {
  auth: AuthState;
  setAuth: (auth: AuthState) => void;
}
