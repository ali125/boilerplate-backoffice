import { ListPagination } from "@/@types/response.type";
import apiSlice from ".";
import { TagTypes } from "@/utils/baseQuery/tagTypes";
import { UserItem, UserFormValues } from "@/@types/user.type";

const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<ListPagination<UserItem[]>, { query: string }>({
      query: ({ query }) => `admin/users${query}`,
      providesTags: (result) => [
        { type: TagTypes.USERS, id: "LIST" },
        ...(result?.data || []).map((item) => ({
          type: TagTypes.USERS,
          id: item.id,
        })),
      ],
    }),
    getUser: builder.query<UserItem, { id: string }>({
      query: ({ id }) => `admin/users/${id}`,
      providesTags: (result) => [{ type: TagTypes.USERS, id: result?.id }],
    }),
    createUser: builder.mutation<UserItem, UserFormValues>({
      query: (data) => ({
        url: "admin/users",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: TagTypes.USERS, id: "LIST" }],
    }),
    updateUser: builder.mutation<UserItem, UserFormValues & { id: string }>({
      query: ({ id, ...body }) => ({
        url: `admin/users/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_res, _err, arg) => [
        { type: TagTypes.USERS, id: "LIST" },
        { type: TagTypes.USERS, id: arg.id },
      ],
    }),
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `admin/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: TagTypes.USERS, id: "LIST" }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApiSlice;

export default usersApiSlice;
