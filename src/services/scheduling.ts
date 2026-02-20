import { apiSlice } from "@/redux/api/apiSlice";

import {} from "@/models/employee";
import { AlterSchedulingPayload, RotaResponse } from "@/models/scheduling";
import { ScheduleFrequency } from "@/models/Requests/schedule";

export const schedulingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    alterScheduling: builder.mutation<
      any,
      { id?: number; payload: AlterSchedulingPayload }
    >({
      query: ({ id, payload }) => {
        const url = !id ? "/admin/rotas" : `/admin/rotas/${id}`;
        return {
          url,
          method: !id ? "POST" : "PUT",
          body: payload,
        };
      },
      invalidatesTags: (_result, _error, arg) => {
        if (arg.id) return [{ type: "scheduling", id: arg.id }, "scheduling"];
        return ["scheduling"];
      },
    }),
    // getUserList: builder.query<Response<PromoListResponse>, PromoListParams>({
    getSchedulingList: builder.query<
      // SchedulingListResponse,
      RotaResponse,
      { frequency: ScheduleFrequency; date: string }
    >({
      query: ({ frequency, date }) => ({
        // url: `/app/rota/${frequency}/all`,
        // url: `/admin/rotas?view=${frequency}`,
        // url: `/admin/rotas?view=weekly`,
        url: `/admin/rotas?view=${frequency}`,
        params: { date },
      }),
      providesTags: ["scheduling"],
    }),

    deleteSchedule: builder.mutation<any, number>({
      query: (id) => ({
        url: `/admin/rotas/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["scheduling"],
    }),
  }),
});

export const {
  useGetSchedulingListQuery,
  useAlterSchedulingMutation,
  useDeleteScheduleMutation,
} = schedulingApi;
