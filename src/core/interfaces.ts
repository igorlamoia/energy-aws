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
  length: number; // number of items in the data
  duration: number; // in seconds
  data: T;
  humanized: string; // human-readable duration
}

export type DbType = 'sql' | 'nosql' | undefined;
