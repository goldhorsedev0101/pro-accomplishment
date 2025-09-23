export interface ForgetPasswordResponseT {
  data: Data;
  status: number;
  statusText: string;
  headers: Headers;
  config: Config;
  request: Request;
}

export interface Data {
  error: null | string;
  message: string;
  data: null;
}

export interface Headers {
  'cache-control': string;
  'content-type': string;
}

export interface Config {
  transitional: Transitional;
  adapter: string[];
  timeout: number;
  xsrfCookieName: string;
  xsrfHeaderName: string;
  maxContentLength: number;
  maxBodyLength: number;
  headers: Headers2;
  method: string;
  url: string;
  data: string;
  allowAbsoluteUrls: boolean;
}

export interface Transitional {
  silentJSONParsing: boolean;
  forcedJSONParsing: boolean;
  clarifyTimeoutError: boolean;
}

export interface Headers2 {
  Accept: string;
  'Content-Type': string;
}
