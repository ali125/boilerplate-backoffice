import { BaseQueryApi, FetchBaseQueryError } from "@reduxjs/toolkit/query";
// import handle401 from "./handlers/handle401";
import getErrorMessage from "./getErrorMessage";
import defaultHandler from "./handlers/defaultHandler";

export type Handler = (
  api: BaseQueryApi,
  code?: number,
  message?: string,
  silent?: boolean
) => void;

const errorHandlers: Record<number, Handler> = {
  // 401: handle401,
};

const handleErrorResponse = (
  api: BaseQueryApi,
  code: number,
  data?: { message?: string },
  silent?: boolean
): { error: FetchBaseQueryError } => {
  const errorMessage = data?.message ?? getErrorMessage(code);
  const handleExtra = errorHandlers[code] ?? defaultHandler;
  handleExtra(api, code, errorMessage, silent);
  return {
    error: {
      status: "CUSTOM_ERROR",
      error: errorMessage,
      data: { statusCode: code },
    },
  };
};

export default handleErrorResponse;
