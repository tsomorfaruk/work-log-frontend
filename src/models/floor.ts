import { ApiResponse } from "./common";
import { Branch } from "./shared";

export interface Floor {
  id: number;
  code_name: string;
  name: string;
  others?: string | null;
  branch_id: string | number;
  company_id: string | number;
  created_at: string;
  updated_at: string;
  branch: Branch;
}

export interface FloorResponse extends ApiResponse {
  data: {
    floor: Floor;
  };
}

export interface FloorListResponse extends ApiResponse {
  data: {
    floors: {
      current_page: number;
      data: Floor[];
      total: number;
      per_page: number;
      first_page_url: string;
      from: number;
      last_page: number;
      last_page_url: string;
      links: {
        url: string | null;
        label: string;
        active: boolean;
      }[];
      next_page_url: string | null;
      path: string;
      prev_page_url: string | null;
      to: number;
    };
  };
}

export interface AlterFloorPayload {
  id?: number;
  name: string;
  code_name: string;
  branch_id: number;
}
