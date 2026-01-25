import { LeaveRequestListResponse } from "./leave";
import { SwapRequestListResponse } from "./swap";

export type RequestType = "swaps" | "leaves";

export type SwapRequestTabs = "pending";
export type ShiftRequestTabs = "pending";

export type RequestListResponse =
  | LeaveRequestListResponse
  | SwapRequestListResponse;
