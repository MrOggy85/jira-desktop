import http from 'tauri/api/http';
import { store } from '@/store';

const BASE_URL = 'https://feedback.kobobooks.com/rest';

export const ENDPOINT = {
  SEARCH: 'api/2/search',
  TICKET: 'api/2/issue',
  MYSELF: 'api/2/myself',
  LOGIN: 'auth/1/session',
};

type HttpOptions = Parameters<typeof http.request>[0]

const defaultOptions = {
  // followRedirects: true,
  // maxRedirections: true,
  connectTimeout: 30000,
  readTimeout: 30000,
  timeout: 30000,
  // allowCompression: true,
  // bodyType: http.BodyType.Auto,
} as HttpOptions;

type Params = {
  endpoint: string;
  method?: HttpOptions['method'];
  body?: HttpOptions['body'];
  queryString?: string;
  withUserCredentials?: boolean;
  headers?: HttpOptions['headers'];
}

export async function request<T>({
  endpoint,
  method = 'GET',
  queryString,
  withUserCredentials = true,
  headers,
  body,
}: Params) {
  const {
    username,
    password,
  } = store.state.user;
  let authHeader = '';
  if (withUserCredentials) {
    const tokenFormat = `${username}:${password}`;
    const hash = btoa(tokenFormat);
    authHeader = `Basic ${hash}`;
  }

  const url = queryString
    ? `${BASE_URL}/${endpoint}?${queryString}`
    : `${BASE_URL}/${endpoint}`;

  const result = await http.request<T>({
    ...defaultOptions,
    url,
    body,
    method,
    headers: {
      ...headers,
      ...withUserCredentials && {
        Authorization: authHeader,
      },
    },
  });

  return result;
}
