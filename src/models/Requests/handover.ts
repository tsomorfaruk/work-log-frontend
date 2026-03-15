export interface HandoverRequestRota {
  id: number;
  date: string;
  shift_start: string;
  shift_end: string;
  shift_type: string;
  employee: {
    id: number | null;
    name: string | null;
  };
}

export interface HandoverRequestItem {
  id: number;
  status: string;
  requested_by: string;
  requested_at: string;
  rota: HandoverRequestRota;
  approved_by: string | null;
  approved_at: string | null;
}

export interface HandoverRequestListResponse {
  status: string;
  message: string;
  data: {
    handovers: {
      data: HandoverRequestItem[];
      current_page: number;
      per_page: number;
      to: number;
      total: number;
    };
  };
}
