import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IDevice } from "../models/IDevice";

export const typeAPI = createApi({
  reducerPath: "typeAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5001/api" }),
  tagTypes: ["Type"],
  endpoints: (build) => ({
    fetchAllTypes: build.query({
      query: () => ({
        url: `/type`,
        headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
      }),
      providesTags: (result) => ["Type"],
    }),
    createType: build.mutation<IDevice, IDevice>({
      query: (type) => ({
        url: `/type`,
        headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
        method: "POST",
        body: type,
      }),
      invalidatesTags: ["Type"],
    }),
    updateType: build.mutation<IDevice, IDevice>({
      query: (type) => ({
        url: `/type/${type.id}`,
        headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
        method: "PUT",
        body: type,
      }),
      invalidatesTags: ["Type"],
    }),
    deleteType: build.mutation<IDevice, IDevice>({
      query: (type) => ({
        url: `/type/${type.id}`,
        headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
        method: "DELETE",
      }),
      invalidatesTags: ["Type"],
    }),
  }),
});
