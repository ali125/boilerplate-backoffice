import { ListPagination } from "@/@types/response.type";
import apiSlice from ".";
import { TagTypes } from "@/utils/baseQuery/tagTypes";
import { PostItem, PostFormBody, Post } from "@/@types/post.type";

const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<ListPagination<PostItem[]>, { query: string }>({
      query: ({ query }) => `admin/posts${query}`,
      providesTags: (result) => [
        { type: TagTypes.POSTS, id: "LIST" },
        ...(result?.data || []).map((item) => ({
          type: TagTypes.POSTS,
          id: item.id,
        })),
      ],
    }),
    getPost: builder.query<Post, { id: string }>({
      query: ({ id }) => `admin/posts/${id}`,
      providesTags: (result) => [{ type: TagTypes.POSTS, id: result?.id }],
    }),
    createPost: builder.mutation<PostItem, { body: PostFormBody }>({
      query: ({ body }) => ({
        url: "admin/posts",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: TagTypes.POSTS, id: "LIST" }],
    }),
    updatePost: builder.mutation<PostItem, { id: string; body: PostFormBody }>({
      query: ({ id, body }) => ({
        url: `admin/posts/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_res, _err, arg) => [
        { type: TagTypes.POSTS, id: "LIST" },
        { type: TagTypes.POSTS, id: arg.id },
      ],
    }),
    deletePost: builder.mutation<void, string>({
      query: (id) => ({
        url: `admin/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: TagTypes.POSTS, id: "LIST" }],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApiSlice;

export default postApiSlice;
