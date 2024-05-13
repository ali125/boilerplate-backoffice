import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type ErrorHandler<T = ErrorDataResponse> = (
  api: BaseQueryApi,
  code: number,
  data?: T,
  silent?: boolean
) => any;

export type ErrorBase = {
  message: string;
  path: string;
  statusCode: number;
  timestamp: string;
};

export type Error400 = {
  message: string;
  path: string;
  statusCode: 400;
  timestamp: string;
  errors: { [key: string]: string[] };
};

export type ErrorDataResponse = Error400 | ErrorBase;
