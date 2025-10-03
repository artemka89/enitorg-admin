import { privateConfig } from '../config';
import { searchParamsToString } from '../lib/search-params-to-string';

import type { ApiClientOptions, ErrorType } from './types';

export async function apiClient<TData>({
  url,
  method = 'GET',
  body,
  params,
  headers = {},
  credentials = 'include',
  signal,
}: ApiClientOptions): Promise<TData> {
  const queryString = searchParamsToString(params);
  const fullUrl = `${privateConfig.VITE_API_URL || ''}${url}${queryString}`;

  const data = body
    ? body instanceof FormData
      ? body
      : JSON.stringify(body)
    : null;

  const config: RequestInit = {
    method,
    headers,
    signal,
    body: data,
    credentials,
  };

  const response = await fetch(fullUrl, config);

  if (!response.ok) {
    const error: ErrorType = await response.json();

    throw new Error(error.message);
  }

  const responseData = await response.json();

  return responseData as TData;
}
