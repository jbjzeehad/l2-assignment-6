import type { IParcel, IResponse } from "@/types";
import { baseApi } from "./baseApi";

export const receiverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllMyParcelsR: builder.query<IResponse<IParcel[]>, unknown>({
      query: (param) => ({
        url: "/parcel/get-all/me",
        method: "GET",
        params: param ? param : {},
      }),
      providesTags: ["Parcel"],
    }),

    ConfirmParcel: builder.mutation<IResponse<IParcel>, string>({
      query: (trackingId) => ({
        url: `/parcel/update/receiver/${trackingId}`,
        method: "PATCH",
        body: {
          status: "Delivered",
        },
      }),
      invalidatesTags: ["Parcel"],
    }),
  }),
});

export const { useConfirmParcelMutation, useGetAllMyParcelsRQuery } =
  receiverApi;
