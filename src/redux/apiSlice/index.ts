import baseQuery from "@/utils/baseQuery";
import { TagTypes } from "@/utils/baseQuery/tagTypes";
import { createApi } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: Object.values(TagTypes),
  baseQuery: baseQuery,
  endpoints: () => ({}),
});

export default apiSlice;
