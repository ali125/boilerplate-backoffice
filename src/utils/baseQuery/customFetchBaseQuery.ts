import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { RootState } from "../../redux/store";

const customFetchBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  credentials: "include", // HttpOnly secure

  prepareHeaders: (headers, { getState }) => {
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    } else if (headers.get("Content-Type") === "multipart/form-data") {
      headers.delete("Content-Type");
    }

    const state = getState() as RootState;
    const accessToken = state.auth.accessToken;
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

export default customFetchBaseQuery;
