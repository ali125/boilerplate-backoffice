import { ListPagination } from "@/@types/response.type";
import apiSlice from ".";
import { TagTypes } from "@/utils/baseQuery/tagTypes";
import { Permission, PermissionFormValues } from "@/@types/permission.type";

const permissionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPermissions: builder.query<
      ListPagination<Permission[]>,
      { query: string }
    >({
      query: ({ query }) => `admin/permissions${query}`,
      providesTags: (result) => [
        { type: TagTypes.PERMISSIONS, id: "LIST" },
        ...(result?.data || []).map((item) => ({
          type: TagTypes.PERMISSIONS,
          id: item.id,
        })),
      ],
    }),
    getPermission: builder.query<Permission, { id: string }>({
      query: ({ id }) => `admin/permissions/${id}`,
      providesTags: (result) => [
        { type: TagTypes.PERMISSIONS, id: result?.id },
      ],
    }),
    createPermission: builder.mutation<Permission, PermissionFormValues>({
      query: (data) => ({
        url: "admin/permissions",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: TagTypes.PERMISSIONS, id: "LIST" }],
    }),
    updatePermission: builder.mutation<
      Permission,
      PermissionFormValues & { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: `admin/permissions/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_res, _err, arg) => [
        { type: TagTypes.PERMISSIONS, id: "LIST" },
        { type: TagTypes.PERMISSIONS, id: arg.id },
      ],
    }),
    deletePermission: builder.mutation<void, string>({
      query: (id) => ({
        url: `admin/permissions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: TagTypes.PERMISSIONS, id: "LIST" }],
    }),
  }),
});

export const {
  useGetPermissionsQuery,
  useGetPermissionQuery,
  useCreatePermissionMutation,
  useUpdatePermissionMutation,
  useDeletePermissionMutation,
} = permissionApiSlice;

export default permissionApiSlice;
