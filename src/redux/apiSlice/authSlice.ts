import {
  RefreshTokenResponse,
  SignInRequest,
  SignInResponse,
} from "@/@types/auth.type";
import apiSlice from ".";

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<SignInResponse, SignInRequest>({
      query: ({ email, password }) => ({
        url: `/auth/login`,
        method: "POST",
        body: { email, password },
      }),
    }),
    refreshAccessToken: builder.mutation<RefreshTokenResponse, void>({
      query: () => ({
        url: `/auth/refreshAccessToken`,
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useRefreshAccessTokenMutation } = authApiSlice;

export default authApiSlice;
