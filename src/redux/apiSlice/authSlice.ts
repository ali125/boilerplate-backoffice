import {
  ChangePasswordFormBody,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ProfileFormBody,
  ProfileResponse,
  RefreshTokenResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
  UserRoleResponse,
} from "@/@types/auth.type";
import apiSlice from ".";
import { TagTypes } from "@/utils/baseQuery/tagTypes";

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<SignInResponse, { body: SignInRequest }>({
      query: ({ body }) => ({
        url: `/auth/login`,
        method: "POST",
        body,
      }),
    }),
    register: builder.mutation<SignUpResponse, { body: SignUpRequest }>({
      query: ({ body }) => ({
        url: `/auth/register`,
        method: "POST",
        body,
      }),
    }),
    forgotPassword: builder.mutation<
      ForgotPasswordResponse,
      { body: ForgotPasswordRequest }
    >({
      query: ({ body }) => ({
        url: `/auth/forgot`,
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation<
      ResetPasswordResponse,
      { body: ResetPasswordRequest }
    >({
      query: ({ body }) => ({
        url: `/auth/resetPassword`,
        method: "POST",
        body,
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
    changePassword: builder.mutation<
      ProfileResponse,
      { body: ChangePasswordFormBody }
    >({
      query: ({ body }) => ({
        url: "/auth/changePassword",
        method: "POST",
        body,
      }),
    }),
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
  useRegisterMutation,
  useRefreshAccessTokenMutation,
  useLogoutMutation,
  useLazyGetUserRoleQuery,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApiSlice;

export default authApiSlice;
