import { ListPagination } from "@/@types/response.type";
import apiSlice from ".";
import { Category, CategoryFormValues } from "@/@types/category.type";
import { TagTypes } from "@/utils/baseQuery/tagTypes";

const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<ListPagination<Category[]>, { query: string }>(
      {
        query: ({ query }) => `admin/categories${query}`,
        providesTags: (result) => [
          { type: TagTypes.CATEGORIES, id: "LIST" },
          ...(result?.data || []).map((item) => ({
            type: TagTypes.CATEGORIES,
            id: item.id,
          })),
        ],
      }
    ),
    getCategory: builder.query<Category, { id: string }>({
      query: ({ id }) => `admin/categories/${id}`,
      providesTags: (result) => [{ type: TagTypes.CATEGORIES, id: result?.id }],
    }),
    createCategory: builder.mutation<Category, CategoryFormValues>({
      query: (data) => ({
        url: "admin/categories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: TagTypes.CATEGORIES, id: "LIST" }],
    }),
    updateCategory: builder.mutation<
      Category,
      CategoryFormValues & { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: `admin/categories/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_res, _err, arg) => [
        { type: TagTypes.CATEGORIES, id: "LIST" },
        { type: TagTypes.CATEGORIES, id: arg.id },
      ],
    }),
    deleteCategory: builder.mutation<void, string>({
      query: (id) => ({
        url: `admin/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: TagTypes.CATEGORIES, id: "LIST" }],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useLazyGetCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApiSlice;

export default categoryApiSlice;
