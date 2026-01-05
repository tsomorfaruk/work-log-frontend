import { createApi } from "@reduxjs/toolkit/query/react";
// import { baseQuery } from "./baseQuery";
import customFetchBase from "./customFetchBase";

const API_TAG_TYPE = ["tagName"];

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: customFetchBase,
  keepUnusedDataFor: 120,
  tagTypes: API_TAG_TYPE,
  endpoints: () => ({}),
});
