import type { IParcel, IResponse } from "@/types";
import { baseApi } from "./baseApi";

export const senderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllMyParcels: builder.query<IResponse<IParcel[]>, unknown>({
      query: (param) => ({
        url: "/parcel/get-all/me",
        method: "GET",
        params: param ? param : {},
      }),
      providesTags: ["Parcel"],
    }),
    createParcel: builder.mutation<IResponse<IParcel>, Partial<IParcel>>({
      query: (data) => ({
        url: "/parcel/create",
        method: "POST",
        body: data,
      }),
    }),
    cancelParcel: builder.mutation<IResponse<IParcel>, string>({
      query: (trackingId) => ({
        url: `/parcel/update/sender/${trackingId}`,
        method: "PATCH",
        body: {
          status: "Cancelled",
        },
      }),
      invalidatesTags: ["Parcel"],
    }),
  }),
});

export const {
  useGetAllMyParcelsQuery,
  useCreateParcelMutation,
  useCancelParcelMutation,
} = senderApi;
