import { ListPagination } from "@/@types/response.type";
import apiSlice from ".";
import { TagTypes } from "@/utils/baseQuery/tagTypes";
import { Tag, TagFormValues } from "@/@types/tag.type";

const tagApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTags: builder.query<ListPagination<Tag[]>, { query: string }>({
      query: ({ query }) => `admin/tags${query}`,
      providesTags: (result) => [
        { type: TagTypes.TAGS, id: "LIST" },
        ...(result?.data || []).map((item) => ({
          type: TagTypes.TAGS,
          id: item.id,
        })),
      ],
    }),
    getTag: builder.query<Tag, { id: string }>({
      query: ({ id }) => `admin/tags/${id}`,
      providesTags: (result) => [{ type: TagTypes.TAGS, id: result?.id }],
    }),
    createTag: builder.mutation<Tag, TagFormValues>({
      query: (data) => ({
        url: "admin/tags",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: TagTypes.TAGS, id: "LIST" }],
    }),
    updateTag: builder.mutation<Tag, TagFormValues & { id: string }>({
      query: ({ id, ...body }) => ({
        url: `admin/tags/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_res, _err, arg) => [
        { type: TagTypes.TAGS, id: "LIST" },
        { type: TagTypes.TAGS, id: arg.id },
      ],
    }),
    deleteTag: builder.mutation<void, string>({
      query: (id) => ({
        url: `admin/tags/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: TagTypes.TAGS, id: "LIST" }],
    }),
  }),
});

export const {
  useGetTagsQuery,
  useLazyGetTagsQuery,
  useGetTagQuery,
  useCreateTagMutation,
  useUpdateTagMutation,
  useDeleteTagMutation,
} = tagApiSlice;

export default tagApiSlice;
