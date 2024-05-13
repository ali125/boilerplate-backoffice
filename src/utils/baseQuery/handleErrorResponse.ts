import { BaseQueryApi, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import handle401 from "./handlers/handle401";
import getErrorMessage from "./getErrorMessage";
import defaultHandler from "./handlers/defaultHandler";
import handle400 from "./handlers/handle400";
import { ErrorDataResponse, ErrorHandler } from "@/@types/error.type";

const errorHandlers: Record<number, ErrorHandler<any>> = {
  401: handle401,
  400: handle400,
};

const handleErrorResponse = (
  api: BaseQueryApi,
  code: number,
  errorData?: ErrorDataResponse,
  silent?: boolean
): { error: FetchBaseQueryError } => {
  const handleExtra = errorHandlers[code] ?? defaultHandler;

  const data = handleExtra(api, code, errorData, silent) || {
    statusCode: code,
  };

  return {
    error: {
      status: "CUSTOM_ERROR",
      error: data?.message || getErrorMessage(code),
      data,
    },
  };
};

export default handleErrorResponse;
