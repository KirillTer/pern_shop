import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IType } from "../models/IType";

export const deviceAPI = createApi({
  reducerPath: "deviceAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5001/api" }),
  tagTypes: ["Device"],
  endpoints: (build) => ({
    fetchAllDevices: build.query({
      query: (reqParams: any = {brandId: null, typeId: null}) => ({
        url: `/device`,
        headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
        params: {
          brandId: reqParams.brandId,
          typeId: reqParams.typeId,
        },
      }),
      providesTags: (result) => ["Device"],
    }),
    fetchById: build.query({
      query: (reqParams: any = {id: 0}) => ({
        url: `/device/${reqParams.id}`,
        headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
      }),
      providesTags: (result) => ["Device"],
    }),
    createDevice: build.mutation<IType, IType>({
      query: (device) => ({
        url: `/device`,
        headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
        method: "POST",
        body: device,
      }),
      invalidatesTags: ["Device"],
    }),
    updateDevice: build.mutation<IType, IType>({
      query: (device) => ({
        url: `/device/${device.id}`,
        headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
        method: "PUT",
        body: device,
      }),
      invalidatesTags: ["Device"],
    }),
    deleteDevice: build.mutation<IType, IType>({
      query: (device) => ({
        url: `/device/${device.id}`,
        headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
        method: "DELETE",
      }),
      invalidatesTags: ["Device"],
    }),
  }),
});
