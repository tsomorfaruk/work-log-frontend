export interface IApiResponse<T> {
  data: T | null;
  totalRecord: number;
  status: "success" | "error" | string;
  message: string;
}

export class ApiResponse<T> implements IApiResponse<T> {
  data: T | null;
  totalRecord: number;
  status: "success" | "error" | string;
  message: string;

  constructor(payload: IApiResponse<T>) {
    this.data = payload.data ?? null;
    this.totalRecord = payload.totalRecord ?? 0;
    this.status = payload.status;
    this.message = payload.message;
  }
}

export class ApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.status = status;
  }
}
