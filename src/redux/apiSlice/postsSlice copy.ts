import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import apiSlice from ".";
import { sub } from "date-fns";

const postAdapter = createEntityAdapter({
    sortComparer: (a: any, b: any) => b.date.localeCompare(a.date)
});

const initialState = postAdapter.getInitialState();

const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPosts: builder.query<any, void>({
            query: () => "/posts",
            transformResponse: (res: any) => {
                let min = 1;
                const loadedPosts = res.map((post: any) => {
                    if (!post?.date) post.date = sub(new Date(), { minutes: min++  }).toISOString();
                    return post;
                });
                return postAdapter.setAll(initialState, loadedPosts);
            },
            providesTags: (result: any) => [
                { type: "POST", id: "LIST" },
                ...result.ids.map((id: any) => ({ type: "POST", id }))
            ]
        }),
        addReaction: builder.mutation<any, any>({
            query: ({ reactions, postId }) => ({
                url: `/posts/${postId}`,
                method: "PATCH",
                body: { reactions }
            }),
            // MY NOTE!!!!
            // It is can be used in like and dislike or bookmark action
            // if the user click on the icon, it should change without any delay and response from the backend
            // Optimistic Update for Reactions
            async onQueryStarted({ postId, reactions}, { dispatch, queryFulfilled }) {
                // `updateQueryData` requires the endpoint name and cache key arguments,
                // so it knows which piece of cache state to update
                const patchResult = dispatch(
                    extendedApiSlice.util.updateQueryData("getPosts", undefined, draft => {
                        // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
                        const post = draft.entities[postId]
                        if (post) post.reactions = reactions
                    })
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            }
        })
    })
});

export const {
    useGetPostsQuery
} = extendedApiSlice;

// returns the query result object
export const selectPostsResult = extendedApiSlice.endpoints.getPosts.select()

// Creates memoized selector
const selectPostsData = createSelector(
    selectPostsResult,
    postsResult => postsResult.data // normalized state object with ids & entities
)

// getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds,
    // Pass in a selector that retursn the posts slice of state
} = postAdapter.getSelectors((state: any) => selectPostsData(state) ?? initialState);

export default extendedApiSlice;