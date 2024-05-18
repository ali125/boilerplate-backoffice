import {
  ProfileFormBody,
  ProfileResponse,
  RefreshTokenResponse,
  SignInRequest,
  SignInResponse,
  UserRoleResponse,
} from "@/@types/auth.type";
import apiSlice from ".";
import { TagTypes } from "@/utils/baseQuery/tagTypes";

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
    getUserRole: builder.query<UserRoleResponse, void>({
      query: () => "/auth/role",
    }),
    getProfile: builder.query<ProfileResponse, void>({
      query: () => "/auth/profile",
      providesTags: [TagTypes.PROFILE],
    }),
    updateProfile: builder.mutation<ProfileResponse, { body: ProfileFormBody }>(
      {
        query: ({ body }) => ({
          url: "/auth/profile",
          method: "POST",
          body,
        }),
        invalidatesTags: [TagTypes.PROFILE],
      }
    ),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: `/auth/logout`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRefreshAccessTokenMutation,
  useLogoutMutation,
  useLazyGetUserRoleQuery,
  useGetProfileQuery,
  useUpdateProfileMutation,
} = authApiSlice;

export default authApiSlice;
