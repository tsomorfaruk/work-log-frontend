import { BASE_URL } from "@/lib/common";
import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
// import { getAuthToken } from '../../lib/authCookie';

// const baseUrl = process.env.BASE_API_URL;
const baseUrl = `${BASE_URL}api`;

// Create a new mutex
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: async (headers, { getState }) => {
    const allState: any = getState();
    console.log("allState: ", allState);
    const token = allState?.auth?.token;

    // const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // headers.set("Content-type", "application/json");
    // if (!(headers as any)._body instanceof FormData) {
    //   headers.set("Content-Type", "application/json");
    // }

    console.log("token: 👨🏼‍🦲👨🏼‍🦲👨🏼‍🦲👨🏼‍🦲", token);
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
      // headers.set("Accept-Language", "en");
      // headers.set('Time-Zone', timeZone) // turned off due to CORS error
      // headers.set("X-Timezone", timeZone);
    }

    return headers;
  },
  paramsSerializer: (params) => {
    const urlParams = new URLSearchParams();
    Object.entries(params).forEach(([key, values]) => {
      if (Array.isArray(values)) {
        values.forEach((val) => {
          if (val && !!String(values).trim().length) urlParams.append(key, val);
        });
      } else if (values !== undefined && !!String(values)?.trim().length) {
        urlParams.append(key, String(values));
      }
    });

    return urlParams.toString();
  },
});

const customFetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  const result = await baseQuery(args, api, extraOptions);
  // const getAllReducer: any = api.getState()

  // refresh token logic will go here

  // if ((result.error as any)?.status === 401) {
  //   if (!mutex.isLocked()) {
  //     const release = await mutex.acquire()
  //     try {
  //       const reData = { refresh: getAllReducer?.auth?.refreshToken }
  //       const refreshResult: any = await baseQuery(
  //         {
  //           // credentials: 'include',
  //           url: versioningApiUrl(ApiVersion.V1, `auth/token/refresh/`),
  //           method: 'POST',
  //           body: reData,
  //         },
  //         api,
  //         extraOptions
  //       )

  //       if (refreshResult?.data?.access) {
  //         const dataStore = {
  //           accessToken: refreshResult?.data?.access,
  //           refreshToken: refreshResult?.data?.refresh,
  //           user: getAllReducer?.auth?.user,
  //         }
  //         localStorage.setItem('auth', JSON.stringify(dataStore))
  //         api.dispatch(userLoggedIn(dataStore))
  //         result = await baseQuery(args, api, extraOptions)
  //       } else {
  //         api.dispatch(userLoggedOut())
  //         localStorage.removeItem('auth')
  //         // window.location.href = '/login';
  //       }
  //     } finally {
  //       // release must be called once the mutex should be released again.
  //       release()
  //     }
  //   } else {
  //     // wait until the mutex is available without locking it
  //     await mutex.waitForUnlock()
  //     result = await baseQuery(args, api, extraOptions)
  //   }
  // }

  return result;
};

export default customFetchBase;
