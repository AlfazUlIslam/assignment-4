import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://assignment-3-ts32.onrender.com/api' }),
  tagTypes: ['Book'],
  endpoints: () => ({}),
});