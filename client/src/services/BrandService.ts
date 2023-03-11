import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IBrand } from "../models/IBrand";

export const brandAPI = createApi({
  reducerPath: "brandAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5001/api" }),
  tagTypes: ["Brand"],
  endpoints: (build) => ({
    fetchAllBrands: build.query({
      query: () => ({
        url: `/brand`,
        headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
      }),
      providesTags: (result) => ["Brand"],
    }),
    createBrand: build.mutation<IBrand, IBrand>({
      query: (brand) => ({
        url: `/brand`,
        headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
        method: "POST",
        body: brand,
      }),
      invalidatesTags: ["Brand"],
    }),
    updateBrand: build.mutation<IBrand, IBrand>({
      query: (brand) => ({
        url: `/brand/${brand.id}`,
        headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
        method: "PUT",
        body: brand,
      }),
      invalidatesTags: ["Brand"],
    }),
    deleteBrand: build.mutation<IBrand, IBrand>({
      query: (brand) => ({
        url: `/brand/${brand.id}`,
        headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
        method: "DELETE",
      }),
      invalidatesTags: ["Brand"],
    }),
  }),
});
