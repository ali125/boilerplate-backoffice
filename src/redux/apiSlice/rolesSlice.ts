import { ListPagination } from "@/@types/response.type";
import apiSlice from ".";
import { TagTypes } from "@/utils/baseQuery/tagTypes";
import { Role, RoleFormValues } from "@/@types/role.type";

const roleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query<ListPagination<Role[]>, { query: string }>({
      query: ({ query }) => `admin/roles${query}`,
      providesTags: (result) => [
        { type: TagTypes.ROLES, id: "LIST" },
        ...(result?.data || []).map((item) => ({
          type: TagTypes.ROLES,
          id: item.id,
        })),
      ],
    }),
    getRole: builder.query<Role, { id: string }>({
      query: ({ id }) => `admin/roles/${id}`,
      providesTags: (result) => [{ type: TagTypes.ROLES, id: result?.id }],
    }),
    createRole: builder.mutation<Role, RoleFormValues>({
      query: (data) => ({
        url: "admin/roles",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: TagTypes.ROLES, id: "LIST" }],
    }),
    updateRole: builder.mutation<Role, RoleFormValues & { id: string }>({
      query: ({ id, ...body }) => ({
        url: `admin/roles/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_res, _err, arg) => [
        { type: TagTypes.ROLES, id: "LIST" },
        { type: TagTypes.ROLES, id: arg.id },
      ],
    }),
    deleteRole: builder.mutation<void, string>({
      query: (id) => ({
        url: `admin/roles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: TagTypes.ROLES, id: "LIST" }],
    }),
  }),
});

export const {
  useGetRolesQuery,
  useLazyGetRolesQuery,
  useGetRoleQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} = roleApiSlice;

export default roleApiSlice;
