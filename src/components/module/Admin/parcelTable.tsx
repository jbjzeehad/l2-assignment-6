import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

import { BanIcon, ShieldCheckIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { IError, ParcelStatus, ParcelTypes } from "@/types";
import {
  useBlockParcelMutation,
  useGetParcelsQuery,
} from "@/store/api/admin.api";
import { toast } from "sonner";
import { BlockConfirmation } from "@/components/layout/BlockConfirmation";
import { useAppSelector } from "@/hooks/redux";

import PaginationGlobal from "../PaginationGlobal";
import ParcelUpdateModal from "./parcelUpdateModal";
import { SearchFilter } from "../Search";
import { useEffect, useState } from "react";

function ParcelTable() {
  const page = useAppSelector((state) => state.page.page);
  const [searchTerm, setSearchTerm] = useState<string>();
  const [type, setType] = useState<ParcelTypes>();
  const [status, setStatus] = useState<ParcelStatus>();
  const { data, isLoading } = useGetParcelsQuery({
    page,
    searchTerm,
    type,
    status,
  });

  const admin = useAppSelector((state) => state.auth.user);
  const statusClassMap: Record<ParcelStatus, string> = {
    Requested: "bg-gray-500 text-white",
    Approved: "bg-yellow-600 text-white",
    Dispatched: "bg-purple-600 text-white",
    "In Transit": "bg-indigo-400 text-white",
    Delivered: "bg-green-600 text-white",
    Cancelled: "bg-red-600 text-white",
    Blocked: "bg-red-600 text-white",
  };

  const [blockParcel] = useBlockParcelMutation();

  const handleBlock = async (
    trackingId: string,
    isBlocked: boolean,
    status: ParcelStatus,
    blockable: boolean
  ) => {
    const msg = isBlocked
      ? "Parcel blocked successfully"
      : "Parcel unblocked successfully";

    const t = toast.loading("Loading...");
    if (!blockable) {
      toast.error("Parcel is not blockable as it has been dispatched", {
        id: t,
      });
      return;
    }
    try {
      await blockParcel({
        trackingId,
        isBlocked,
        address: admin?.address as string,
        status: status,
      }).unwrap();
      toast.success(msg, { id: t });
    } catch (error) {
      console.log(error);
      toast.error((error as IError)?.message || "Something went wrong", {
        id: t,
      });
    }
  };

  useEffect(() => {
    console.log(searchTerm);
  }, [searchTerm]);

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
                      <ParcelUpdateModal parcel={parcel} />

                      {parcel.isBlocked ? (
                        <BlockConfirmation
                          onConfirm={() =>
                            handleBlock(
                              parcel.trackingId as string,
                              false,
                              "Requested",
                              true
                            )
                          }
                          msg="Are you sure you want to unblock this parcel?"
                        >
                          <Button
                            className="bg-green-600 hover:bg-green-700"
                            size="icon"
                          >
                            <ShieldCheckIcon className="w-4 h-4 text-white" />
                          </Button>
                        </BlockConfirmation>
                      ) : (
                        <BlockConfirmation
                          onConfirm={() =>
                            handleBlock(
                              parcel.trackingId as string,
                              true,
                              "Blocked",
                              parcel.status === "Requested" ||
                                parcel.status === "Approved"
                            )
                          }
                          msg="Are you sure you want to block this parcel?"
                        >
                          <Button
                            className="bg-red-600 hover:bg-red-700"
                            size="icon"
                          >
                            <BanIcon className="w-4 h-4 text-white" />
                          </Button>
                        </BlockConfirmation>
                      )}
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
