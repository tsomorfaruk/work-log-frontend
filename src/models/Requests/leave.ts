export interface LeaveRequestItem {
  id: number;
  status: string;
  requested_by: string;
  leave_type: string;
  requested: {
    from: string;
    to: string;
    total_day: string;
  };
  approved: null;
  approved_by: null;
  approved_at: null;
  note: null;
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
