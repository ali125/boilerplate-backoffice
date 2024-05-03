import { ListPagination } from "@/@types/response.type";
import apiSlice from ".";

const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<ListPagination<any[]>, { query: string }>({
      query: ({ query }) => `admin/posts${query}`,
      keepUnusedDataFor: 1,
      // providesTags: (result: any) => [
      //   { type: "POST", id: "LIST" },
      //   ...result.data.map((item: any) => ({ type: "POST", id: item.id })),
      // ],
    }),
  }),
});

export const { useGetPostsQuery } = postApiSlice;

export default postApiSlice;
