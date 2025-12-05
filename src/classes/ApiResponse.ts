export class ApiResponse<T> {
  data: T | null  ;
  totalRecord: number;
  status?: string;
  message?: string;   

  constructor(data: T | null = null, totalRecord: number = 0) {
    this.data = data??{}  as T;
    this.totalRecord = totalRecord;
    this.status = undefined;
    this.message = undefined;
  } 
}