import type { IParcel, IResponse } from "@/types";
import { baseApi } from "./baseApi";

export const publicApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSingleParcel: builder.query<IResponse<IParcel>, string>({
      query: (trackingId) => ({
        url: `/parcel/get/${trackingId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetSingleParcelQuery } = publicApi;
