export interface IBaseResponse {
  error: boolean;
  message?: string;
  result?: any;
  statusCode?: number;
  timestamp?: string;
}