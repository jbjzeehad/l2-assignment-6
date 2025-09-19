import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import type { ParcelStatus, ParcelTypes } from "@/types";
import { useAppSelector } from "@/hooks/redux";

import PaginationGlobal from "../PaginationGlobal";
import {
  useCancelParcelMutation,
  useGetAllMyParcelsQuery,
} from "@/store/api/sender.api";
import { useState } from "react";
import { SearchFilter } from "../Search";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ParcelModal } from "./ParcelModal";

function ParcelTable() {
  const page = useAppSelector((state) => state.page.page);
  const [searchTerm, setSearchTerm] = useState<string>();
  const [type, setType] = useState<ParcelTypes>();
  const [status, setStatus] = useState<ParcelStatus>();
  const { data, isLoading } = useGetAllMyParcelsQuery({
    page,
    searchTerm,
    type,
    status,
  });
  const [cancel] = useCancelParcelMutation();

  const statusClassMap: Record<ParcelStatus, string> = {
    Requested: "bg-gray-500 text-white",
    Approved: "bg-yellow-600 text-white",
    Dispatched: "bg-purple-600 text-white",
    "In Transit": "bg-indigo-400 text-white",
    Delivered: "bg-green-600 text-white",
    Cancelled: "bg-red-600 text-white",
    Blocked: "bg-red-600 text-white",
  };
  const handleCancel = async (trackingId: string) => {
    const t = toast.loading("Cancelling parcel...");
    try {
      const res = await cancel(trackingId).unwrap();
      console.log(res);
      toast.success("Parcel cancelled successfully", { id: t });
    } catch (error) {
      console.log(error);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      toast.error((error as any).data?.message || "Something went wrong", {
        id: t,
      });
    }
  };
  return (
    <div className="rounded-lg border shadow-sm overflow-hidden">
      <SearchFilter
        onSearchChange={(val) => val !== "all" && setSearchTerm(val)}
        onTypeChange={(val) =>
          val !== "all" ? setType(val) : setType(undefined)
        }
        onStatusChange={(val) =>
          val !== "all" ? setStatus(val) : setStatus(undefined)
        }
      />
      <Table className="text-sm">
        <TableHeader className="bg-muted">
          <TableRow>
            <TableHead className="w-[150px]">Tracking ID</TableHead>
            <TableHead className="w-[200px]">Title</TableHead>
            <TableHead className="w-[50px]">Type</TableHead>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead className="w-[100px]">Delivery Date</TableHead>
            <TableHead className="w-[140px]">Sender</TableHead>
            <TableHead className="w-[120px]">Receiver</TableHead>
            <TableHead className="w-[100px]">Fee</TableHead>
            <TableHead className="text-right w-[120px]">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading
            ? Array.from({ length: 10 }).map((_, i) => (
                <TableRow key={i} className="animate-pulse">
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-48" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-28" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-8 w-8 rounded-md" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-8 w-8 rounded-md" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-8 w-8 rounded-md" />
                  </TableCell>
                </TableRow>
              ))
            : data?.data.map((parcel) => (
                <TableRow
                  className="hover:bg-muted/50 transition-colors"
                  key={parcel._id}
                >
                  <TableCell className="font-medium text-primary">
                    {parcel.trackingId}
                  </TableCell>
                  <TableCell>{parcel.title}</TableCell>
                  <TableCell>{parcel.type}</TableCell>
                  <TableCell>
                    <Badge
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        statusClassMap[parcel.status]
                      }`}
                    >
                      {parcel.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-muted-foreground">
                    {new Date(parcel.deliveryDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{parcel.sender?.name ?? "N/A"}</TableCell>
                  <TableCell>{parcel.receiver?.name ?? "N/A"}</TableCell>
                  <TableCell>{parcel.fee}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-5">
                      <ParcelModal parcel={parcel} />
                      <Button
                        className="text-foreground"
                        onClick={() =>
                          handleCancel(parcel.trackingId as string)
                        }
                      >
                        Cancel
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
      {data?.meta && <PaginationGlobal totalPages={data?.meta?.totalPages} />}
    </div>
  );
}
export default ParcelTable;
