export interface LeaveRequestItem {
  id: number;
  status: string;
  requested_by: string;
  leave_type: string;
  requested: {
    from: string;
    to: string;
    total_day: string;
    employee: {
      id: number;
      name: string;
    };
  };
  approved: string | null;
  approved_by: string | null;
  approved_at: string | null;
  note: string | null;
}

export interface LeaveRequestListResponse {
  status: string;
  message: string;
  data: {
    leaves: {
      data: LeaveRequestItem[];
      current_page: number;
      per_page: number;
      to: number;
      total: number;
    };
  };
}
