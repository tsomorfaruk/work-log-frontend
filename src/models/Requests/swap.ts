export interface SwapRequestRota {
  id: number;
  date: string;
  shift_start: string;
  shift_end: string;
  shift_type: string;
  employee: {
    id: number;
    name: string;
  };
}

export interface SwapRequestItem {
  id: number;
  status: string;
  requested_by: null;
  requested_at: string;
  my_rota: SwapRequestRota;
  requested_rota: SwapRequestRota;
  approved_by: string;
  approved_at: string | null;
}

export interface SwapRequestListResponse {
  status: string;
  message: string;
  data: {
    swaps: {
      data: SwapRequestItem[];
      current_page: number;
      per_page: number;
      to: number;
      total: number;
    };
  };
}
