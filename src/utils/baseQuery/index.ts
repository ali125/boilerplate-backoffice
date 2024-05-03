import {
  BaseQueryApi,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  retry,
} from "@reduxjs/toolkit/query";
import customFetchBaseQuery from "./customFetchBaseQuery";
import handleErrorResponse from "./handleErrorResponse";
import { logOut, setAuthToken } from "@/redux/authSlice";
import { createApi } from "@reduxjs/toolkit/query/react";

interface Args extends FetchArgs {
  silent?: boolean;
}

const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args: Args | string, api, extraOptions) => {
  let result = await customFetchBaseQuery(args, api, extraOptions);

  if (result.error) {
    let statusCode: number = 500;
    if (typeof result.error.status === "number")
      statusCode = result.error.status;

    if (statusCode === 401) {
      console.log("sending refresh token");
      // send refresh token to get new access token
      const refreshResult = await customFetchBaseQuery(
        {
          url: "/auth/refreshAccessToken",
          method: "POST",
        },
        api,
        extraOptions
      );
      console.log(refreshResult);
      if (refreshResult?.data) {
        // stire the new token
        api.dispatch(
          setAuthToken({
            accessToken: (refreshResult.data as any)?.accessToken || "",
          })
        );
        // retry the original query with new access token
        result = await customFetchBaseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logOut());
      }
    }

    let silent;
    if (typeof args !== "string") {
      silent = args?.silent;
    }

    return handleErrorResponse(
      api,
      statusCode,
      (result.error?.data as any)?.data,
      silent
    );
  }

  return result;
};

export const baseQueryWithRetry = (maxRetries = 0) => {
  return retry(
    async (args: string | FetchArgs, api: BaseQueryApi, extraOptions) =>
      await customFetchBaseQuery(args, api, extraOptions),
    { maxRetries }
  );
};

export default baseQuery;
