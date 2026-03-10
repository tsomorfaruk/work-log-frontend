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
      {
        frequency: ScheduleFrequency;
        date: string;
        page?: number;
        branch_id?: string | number;
        department_id?: string | number;
        floor_id?: string | number;
      }
    >({
      query: ({
        frequency,
        date,
        page,
        branch_id,
        department_id,
        floor_id,
      }) => ({
        // url: `/app/rota/${frequency}/all`,
        // url: `/admin/rotas?view=${frequency}`,
        // url: `/admin/rotas?view=weekly`,
        url: `/admin/rotas?view=${frequency}`,
        params: { date, page, branch_id, department_id, floor_id },
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
    swapSchedule: builder.mutation<
      any,
      {
        source_id: number;
        target_id: number | null;
        target_employee_id?: number;
        target_date?: string;
      }
    >({
      query: (payload) => ({
        url: `/admin/rotas/swap`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["scheduling"],
    }),
  }),
});

export const {
  useGetSchedulingListQuery,
  useAlterSchedulingMutation,
  useDeleteScheduleMutation,
  useSwapScheduleMutation,
} = schedulingApi;
