import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../context/apiSlice";
import { setupListeners } from '@reduxjs/toolkit/query'

const store = configureStore({
    reducer : {
        [apiSlice.reducerPath] : apiSlice.reducer,
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)

})

export default store ;

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch