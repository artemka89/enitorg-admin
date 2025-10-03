export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type ApiClientOptions = {
  url: string;
  method?: RequestMethod;
  body?: unknown;
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
  credentials?: 'include' | 'omit' | 'same-origin';
  signal?: AbortSignal;
};

export type ErrorType = {
  type: string;
  code: number;
  message: string;
};

export interface PaginatedResponse<T> {
  items: T[];
  nextCursor?: string;
  hasNextPage: boolean;
  limit: number;
}
