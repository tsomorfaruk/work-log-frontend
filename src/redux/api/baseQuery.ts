import { BASE_URL } from "@/lib/common";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const baseUrl = `${BASE_URL}api`;

export const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    // const token = getCookie("auth");
    // if (token) {
    //   headers.set("Authorization", `Bearer ${token}`);
    // }
    // headers.set("apiKey", "QOV0rgp9-bLqdJV77iPRvSKhFQ5m9YMw");
    // headers.set("service", "pihr");
    return headers;
  },
});
