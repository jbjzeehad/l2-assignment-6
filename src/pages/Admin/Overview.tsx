import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetParcelsQuery, useGetUsersQuery } from "@/store/api/admin.api";
import type { ParcelStatus } from "@/types";
import {
  CheckCircle,
  Loader,
  Package,
  Send,
  Truck,
  Users,
  XCircle,
} from "lucide-react";

const commonQueryOptions = { refetchOnMountOrArgChange: true };

function useParcelsWithStatus(status?: ParcelStatus | null) {
  return useGetParcelsQuery(status ? { status } : null, commonQueryOptions);
}

function Overview() {
  const { data: user, isLoading: userLoading } = useGetUsersQuery(
    null,
    commonQueryOptions
  );

  const parcelsQueries = {
    total: useParcelsWithStatus(null),
    delivered: useParcelsWithStatus("Delivered"),
    requested: useParcelsWithStatus("Requested"),
    cancelled: useParcelsWithStatus("Cancelled"),
    inTransit: useParcelsWithStatus("In Transit"),
    dispatched: useParcelsWithStatus("Dispatched"),
  };

  const cards = [
    {
      title: "Total Users",
      icon: <Users className="w-6 h-6 text-primary" />,
      count: user?.meta?.total,
      loading: userLoading,
    },
    {
      title: "Total Parcels",
      icon: <Package className="w-6 h-6 text-primary" />,
      count: parcelsQueries.total.data?.meta?.total,
      loading: parcelsQueries.total.isLoading,
    },
    {
      title: "Requested",
      icon: <Loader className="w-6 h-6 text-blue-500 animate-spin-slow" />,
      count: parcelsQueries.requested.data?.meta?.total,
      loading: parcelsQueries.requested.isLoading,
    },
    {
      title: "In Transit",
      icon: <Truck className="w-6 h-6 text-yellow-500" />,
      count: parcelsQueries.inTransit.data?.meta?.total,
      loading: parcelsQueries.inTransit.isLoading,
    },
    {
      title: "Dispatched",
      icon: <Send className="w-6 h-6 text-purple-600" />,
      count: parcelsQueries.dispatched.data?.meta?.total,
      loading: parcelsQueries.dispatched.isLoading,
    },
    {
      title: "Delivered",
      icon: <CheckCircle className="w-6 h-6 text-green-600" />,
      count: parcelsQueries.delivered.data?.meta?.total,
      loading: parcelsQueries.delivered.isLoading,
    },
    {
      title: "Cancelled",
      icon: <XCircle className="w-6 h-6 text-red-600" />,
      count: parcelsQueries.cancelled.data?.meta?.total,
      loading: parcelsQueries.cancelled.isLoading,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 lg:gap-6 lg:mx-20">
      {cards.map(({ title, icon, count, loading }) => (
        <Card key={title} className="shadow-md hover:shadow-lg transition">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            {icon}
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-4 w-1/10 bg-muted-foreground" />
            ) : (
              <span className="text-2xl font-bold">{count ?? "-"}</span>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default Overview;
