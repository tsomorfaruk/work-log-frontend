import { LeaveRequestListResponse } from "./leave";
import { SwapRequestListResponse } from "./swap";
import { HandoverRequestListResponse } from "./handover";

export type RequestType = "swaps" | "leaves" | "handovers";

export type SwapRequestTabs = "all" | "pending";
export type LeaveRequestTabs = "all" | "pending" | "rejected";
export type HandoverRequestTabs = "pending" | "accepted";

export type RequestListResponse =
  | LeaveRequestListResponse
  | SwapRequestListResponse
  | HandoverRequestListResponse;

export interface RequestParams {
  type: RequestType;
  page: number;
  status: number | undefined;
}
