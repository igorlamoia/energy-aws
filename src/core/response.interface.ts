export interface IResponse<T> {
  message: string;
  data?: T;
}

export interface IErrorResponse {
  message: string;
  error: string;
  statusCode: number;
  timestamp?: string;
}

export interface ITime<T> {
  duration: number; // in seconds
  data: T;
  humanized: string; // human-readable duration
}