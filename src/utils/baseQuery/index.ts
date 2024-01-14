import { BaseQueryApi, BaseQueryFn, FetchArgs, FetchBaseQueryError, retry } from "@reduxjs/toolkit/query";
import customFetchBaseQuery from "./customFetchBaseQuery";
import handleErrorResponse from "./handleErrorResponse";

interface Args extends FetchArgs {
    silent?: boolean;
}

const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args: Args | string, api, extraOptions) => {
    const result = await customFetchBaseQuery(args, api, extraOptions);

    if (result.error) {
        let statusCode: number = 500;
        if (typeof result.error.status === "number") statusCode = result.error.status;

        let silent;
        if (typeof args !== "string") {
            silent = args?.silent;
        }

        return handleErrorResponse(api, statusCode, (result.error?.data as any)?.data, silent)
    }

    return result;
}

export const baseQueryWithRetry = (maxRetries = 0) => {
    return retry(async (args: string | FetchArgs, api: BaseQueryApi, extraOptions) => await customFetchBaseQuery(args, api, extraOptions), { maxRetries });
}

export default baseQuery;
