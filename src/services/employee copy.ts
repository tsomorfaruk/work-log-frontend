import { Response } from "@/models/common";
import {
  PromoAlterPayload,
  PromoAlterResponse,
  PromoDetailsResponse,
  PromoListParams,
  PromoListResponse,
  PromoPaymentMethodsListResponse,
  TogglePromoStatusPayload,
} from "@/models/Promo/Promo";

import { apiSlice } from "../api/apiSlice";
import { versioningApiUrl } from "@/utils/helpers";
import { ApiVersion } from "@/utils/constants";

export const promoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    alterPromo: builder.mutation<
      PromoAlterResponse,
      { data: Partial<PromoAlterPayload>; id: string | null }
    >({
      query: ({ id, data }) => {
        const url = !id ? "promos/" : `promos/${id}/`;
        return {
          url: versioningApiUrl(ApiVersion.V1, url),
          method: !id ? "post" : "PATCH",
          body: data,
        };
      },
      invalidatesTags: (_result, _error, arg) => {
        if (arg.id) return [{ type: "promo", id: arg.id }, "promo"];
        return ["promo"];
      },
    }),

    getPromoList: builder.query<Response<PromoListResponse>, PromoListParams>({
      query: ({
        page = 1,
        search,
        promo_status,
        promo_start_date,
        promo_end_date,
        page_size,
      }) => ({
        url: versioningApiUrl(ApiVersion.V1, `promos/`),
        params: {
          page,
          search,
          promo_status,
          promo_start_date,
          promo_end_date,
          page_size,
        },
      }),
      providesTags: ["promo"],
    }),

    getPromoDetails: builder.query<PromoDetailsResponse, string>({
      query: (id) => ({
        url: versioningApiUrl(ApiVersion.V1, `promos/${id}/`),
      }),
      providesTags: ["promo"],
      keepUnusedDataFor: 0,
    }),

    getPromoPaymentMethods: builder.query<
      Response<PromoPaymentMethodsListResponse>,
      void
    >({
      query: () => ({
        url: versioningApiUrl(ApiVersion.V1, `payment-methods`),
      }),
      providesTags: ["promo-payment-method"],
    }),

    togglePromoStatus: builder.mutation<
      PromoAlterResponse,
      { data: TogglePromoStatusPayload; id: string }
    >({
      query: ({ id, data }) => {
        return {
          url: versioningApiUrl(ApiVersion.V1, `promos/${id}/`),
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: (_result, _error, arg) => {
        if (arg.id) return [{ type: "promo", id: arg.id }, "promo"];
        return ["promo"];
      },
    }),
  }),
});

export const {
  useAlterPromoMutation,
  useGetPromoListQuery,
  useGetPromoDetailsQuery,
  useGetPromoPaymentMethodsQuery,
  useTogglePromoStatusMutation,
} = promoApi;
