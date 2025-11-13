import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/",
  }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "products",
      providesTags: (result) =>
        result
          ? [...result.map(({ id }: any) => ({ type: "Products" as const, id })), { type: "Products", id: "LIST" }]
          : [{ type: "Products", id: "LIST" }],
    }),
    getProductById: builder.query({
      query: (id: string) => `products/${id}`,
    }),
    deleteProduct: builder.mutation({
      query: (id: string) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (id) => [{ type: "Products", id }],
    }),
    addProduct: builder.mutation({
      query: (product: any) => ({
        url: `products`,
        method: "POST",
        body: product,
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
    updateProduct: builder.mutation({
      query: ({ id, product }: any) => ({
        url: `products/${id}`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: ({id}) => [{ type: "Products", id }],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery, useDeleteProductMutation, useAddProductMutation, useUpdateProductMutation } = productsApi;