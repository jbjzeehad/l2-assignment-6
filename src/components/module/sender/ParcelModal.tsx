"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import type { IParcel, ParcelStatusLog } from "@/types";
import { format } from "date-fns";
import { useState } from "react";

interface ParcelModalProps {
  parcel: IParcel; // You can type this properly later
}

export function ParcelModal({ parcel }: ParcelModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">View Parcel</Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{parcel.title}</DialogTitle>
          <DialogDescription>
            Tracking ID:{" "}
            <span className="font-medium">{parcel.trackingId}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium">Sender</p>
              <p>{parcel.sender?.name}</p>
              <p>{parcel.sender?.phone}</p>
              <p className="truncate">{parcel.sender?.address}</p>
            </div>
            <div>
              <p className="font-medium">Receiver</p>
              <p>{parcel.receiver?.name}</p>
              <p>{parcel.receiver?.phone}</p>
              <p className="truncate">{parcel.receiver?.address}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <p>
              <span className="font-medium">Type:</span> {parcel.type}
            </p>
            <p>
              <span className="font-medium">Weight:</span> {parcel.weight} kg
            </p>
            <p>
              <span className="font-medium">Fee:</span> ${parcel.fee}
            </p>
            <p>
              <span className="font-medium">Delivery Date:</span>{" "}
              {format(new Date(parcel.deliveryDate), "PPP")}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-medium">Current Status:</span>
            <Badge variant="outline">{parcel.status}</Badge>
          </div>
        </div>

        <Separator />

        <div>
          <p className="font-medium mb-2">Status Logs</p>
          <ScrollArea className="h-60 pr-2">
            <ul className="space-y-4">
              {parcel.statusLogs.map((log: ParcelStatusLog, idx: number) => (
                <li
                  key={idx}
                  className="p-3 border rounded-lg bg-muted/30 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{log.status}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(log.timestamp), "PPpp")}
                    </span>
                  </div>
                  <p className="text-sm">{log.notes}</p>
                  <p className="text-xs text-muted-foreground">
                    Location: {log.location}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Updated By: {log.updatedBy.name}
                  </p>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
