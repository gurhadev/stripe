// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type Todo = {
    userId: number,
    id: number,
    title: string,
    completed: boolean
}

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
    reducerPath: 'Api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
    endpoints: (builder) => ({
        getTodo: builder.query<Todo[],void>({
            query: () => "/todos",
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetTodoQuery } = apiSlice