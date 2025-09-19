import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLazyGetSingleParcelQuery } from "@/store/api/public.api";
import { useState } from "react";

export default function ParcelTracking() {
  const [trackingId, setTrackingId] = useState("");
  const [trigger, { data, isFetching, isError }] =
    useLazyGetSingleParcelQuery();

  const handleTrack = () => {
    if (trackingId.trim()) {
      trigger(trackingId);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Parcel Tracking</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Input
            placeholder="Enter tracking ID"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
          />
          <Button onClick={handleTrack} disabled={isFetching}>
            {isFetching ? "Tracking..." : "Track"}
          </Button>
        </CardContent>
      </Card>

      {isError && (
        <Card>
          <CardContent className="text-red-500 p-4">
            Parcel not found. Please check your Tracking ID.
          </CardContent>
        </Card>
      )}

      {data?.data && (
        <Card>
          <CardHeader>
            <CardTitle>Parcel Details</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <span className="font-semibold">Tracking ID:</span>{" "}
              {data.data.trackingId}
            </p>
            <p>
              <span className="font-semibold">Type:</span> {data.data.type}
            </p>
            <p>
              <span className="font-semibold">Current Status:</span>{" "}
              {data.data.status}
            </p>

            <div className="mt-6 space-y-4">
              <h3 className="font-semibold">Status Timeline</h3>
              <div className="border-l pl-4 space-y-4">
                {data.data.statusLogs.map((log, idx) => (
                  <div key={idx} className="relative pl-4">
                    <span className="absolute -left-[22px] top-1.5 w-3 h-3 rounded-full bg-blue-500"></span>
                    <p className="font-medium">{log.status}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(log.timestamp).toLocaleString()} •{" "}
                      {log.updatedBy?.name}
                    </p>
                    {log.notes && (
                      <p className="text-sm italic text-gray-600">
                        {log.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
