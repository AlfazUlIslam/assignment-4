import { api } from "../api/apiSlice";
import type { IGetBooksResponse, IGetBookResponse, IUpdateBookResponse, IBook, IBorrowBookResponse, IBorrow, ICreateBookResponse, IBorrowSummaryResponse } from "./bookTypes";

export const booksApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getBooks: builder.query<IGetBooksResponse, number>({
            query: (page) => `/books?page=${page}`,
            providesTags: ["Book"]
        }),
        getBook: builder.query<IGetBookResponse, string>({
            query: (id) => `/books/${id}`,
            providesTags: ["Book"]
        }),
        updateBook: builder.mutation<IUpdateBookResponse, {id: string, updates: Partial<IBook>}>({
            query: ({ id, updates }) => ({
                url: `/books/${id}`,
                method: 'PUT', // or PATCH depending on your API
                body: updates,
            }),
            invalidatesTags: ["Book"]
        }),
        deleteBook: builder.mutation<void, string>({
            query: (id) => ({
                url: `/books/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Book"]
        }),
        borrowBook: builder.mutation<IBorrowBookResponse, {updates: Partial<IBorrow>}>({
            query: ({updates}) => ({
                url: "/borrow",
                method: "POST",
                body: updates
            }),
            invalidatesTags: ["Book"]
        }),
        createBook: builder.mutation<ICreateBookResponse, {updates: Partial<IBook>}>({
            query: ({updates}) => ({
                url: "/books",
                method: "POST",
                body: updates
            }),
            invalidatesTags: ["Book"]
        }),
        getBorrowSummary: builder.query<IBorrowSummaryResponse, number>({
            query: (page) => `/borrow?page=${page}`,
            providesTags: ["Book"]
        }),
    })
});

export const { useGetBooksQuery, useGetBookQuery, useUpdateBookMutation, useDeleteBookMutation, useBorrowBookMutation, useCreateBookMutation, useGetBorrowSummaryQuery } = booksApi;