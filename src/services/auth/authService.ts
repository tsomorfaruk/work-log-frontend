import { apiSlice } from "@/redux/api/apiSlice";
import { TLoginSchema } from "@/schemas/loginSchema";
import { userLoggedIn, userLoggedOut } from "./authSlice";
import { deleteAuthToken, setAuthToken } from "@/lib/authCookie";
import { LoginResponse } from "@/models/auth";
import { TForgotPasswordSchema } from "@/schemas/forgotPasswordSchema";
import { TResetPasswordSchema } from "@/schemas/resetPasswordSchema";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, TLoginSchema>({
      query: (data) => ({
        url: "/admin/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const token = result?.data?.data?.token;

          if (token) setAuthToken(token);
          dispatch(userLoggedIn(token));
        } catch (error) {
          console.log("Error setting auth token: ", error);
        }
      },
    }),
    logout: builder.mutation<unknown, void>({
      query: () => ({
        url: "/admin/logout",
        method: "POST",
      }),
      async onQueryStarted(_arg, { dispatch }) {
        try {
          deleteAuthToken();
          dispatch(userLoggedOut());
        } catch (error) {
          console.log("Error setting auth token: ", error);
        }
      },
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation<unknown, TForgotPasswordSchema>({
      query: (data) => ({
        url: "/admin/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation<unknown, TResetPasswordSchema>({
      query: (data) => ({
        url: "/admin/reset-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
