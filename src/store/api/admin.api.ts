import type { IParcel, IResponse, IUser, ParcelStatus } from "@/types";
import { baseApi } from "./baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<IResponse<IUser[]>, unknown>({
      query: (params) => ({
        url: "/user/get-all",
        method: "GET",
        params: params ? params : {},
      }),
      providesTags: ["User"],
    }),
    blockUser: builder.mutation<
      IResponse<IUser>,
      { id: string; isBlocked: boolean }
    >({
      query: ({ id, isBlocked }) => ({
        url: `/user/update/${id}`,
        method: "PATCH",
        body: { isBlocked: isBlocked },
      }),
      invalidatesTags: ["User"],
    }),
    getParcels: builder.query<IResponse<IParcel[]>, unknown>({
      query: (param) => ({
        url: "/parcel/get-all",
        method: "GET",
        params: param ? param : {},
      }),
      providesTags: ["Parcel"],
    }),
    blockParcel: builder.mutation<
      IResponse<IParcel>,
      {
        trackingId: string;
        isBlocked: boolean;
        address: string;
        status: ParcelStatus;
      }
    >({
      query: ({ trackingId, isBlocked, status, address }) => ({
        url: `/parcel/update/admin/${trackingId}`,
        method: "PATCH",
        body: {
          isBlocked: isBlocked,
          status: status,
          statusLog: {
            location: address,
            status: status,
            notes: "Parcel blocked by an admin",
          },
        },
      }),
      invalidatesTags: ["Parcel"],
    }),
    updateParel: builder.mutation<IResponse<IParcel>, Partial<IParcel>>({
      query: (data) => ({
        url: `/parcel/update/admin/${data.trackingId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Parcel"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetParcelsQuery,
  useBlockUserMutation,
  useBlockParcelMutation,
  useUpdateParelMutation,
} = adminApi;
