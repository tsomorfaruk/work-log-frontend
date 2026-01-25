import { ApiResponse } from "./common";

/* ----------------------------------
   Shared range type
-----------------------------------*/
export interface SchedulingRange {
  start_date: string;
  end_date: string;
}

/* ----------------------------------
   API Rota (RAW)
-----------------------------------*/
export interface SchedulingRota {
  employee: {
    id: number;
    first_name: string;
    last_name: string;
    display_name: string;
    email: string;
    phone: string;
    designation: string;
  };
  employee_id: number;
  employee_name: string;

  // ✅ FIXED: ARRAY, not tuple
  rotas: {
    date: string;
    shift_start_time: string;
    shift_end_time: string;
    break_start_time: string | null;
    break_end_time: string | null;
    total_hours: string;
    location: string;
    remarks: string;
    shift_type: string;
  }[];
}

/* ----------------------------------
   Month | Week discriminator
-----------------------------------*/
export type SchedulingPeriod =
  | { month: SchedulingRange }
  | { week: SchedulingRange };

/* ----------------------------------
   API RESPONSE
-----------------------------------*/
export interface SchedulingListResponse extends ApiResponse {
  data: SchedulingPeriod & {
    rotas: SchedulingRota[];
  };
}

/* ----------------------------------
   TRANSFORMED MODELS (UI-friendly)
-----------------------------------*/
export interface RotaDay {
  date: string;
  rota: {
    shift_start_time: string;
    shift_end_time: string;
    date: string;
    location: string;
    remarks: string;
    break_end_time: string | null;
    break_start_time: string | null;
    shift_type: string;
    total_hours: string;
  } | null;
}

export interface TransformedSchedulingRota extends Omit<
  SchedulingRota,
  "rotas"
> {
  rotas: RotaDay[];
}

export interface TransformedSchedulingResponse extends Omit<
  SchedulingListResponse,
  "data"
> {
  data: Omit<SchedulingListResponse["data"], "rotas"> & {
    rotas: TransformedSchedulingRota[];
  };
}
