import { LeaveRequestListResponse } from "./leave";
import { SwapRequestListResponse } from "./swap";

export type RequestType = "swaps" | "leaves";

export type SwapRequestTabs = "all" | "pending";
export type LeaveRequestTabs = "all" | "pending" | "rejected";

export type RequestListResponse =
  | LeaveRequestListResponse
  | SwapRequestListResponse;

export interface RequestParams {
  type: RequestType;
  page: number;
  status: number | undefined;
}
