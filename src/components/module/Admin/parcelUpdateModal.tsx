import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { parcelStatusOptions } from "@/types/parcel.types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import type z from "zod";
import { updateAdminParcelSchema } from "./updateSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { CalendarIcon, PencilIcon } from "lucide-react";
import { useUpdateParelMutation } from "@/store/api/admin.api";
import type { IError, IParcel, ParcelStatus } from "@/types";
import { toast } from "sonner";
import { useAppSelector } from "@/hooks/redux";

function ParcelUpdateModal({ parcel }: { parcel: IParcel }) {
  const user = useAppSelector((state) => state.auth.user);
  const [updateParcel] = useUpdateParelMutation();
  const [trackingId, setTrackingId] = useState<string>("");

  const form = useForm<z.infer<typeof updateAdminParcelSchema>>({
    resolver: zodResolver(updateAdminParcelSchema),
    defaultValues: {
      deliveryDate: parcel.deliveryDate,
      trackingId: parcel.trackingId,
      status: parcel.status,
      statusLog: {
        location: user?.address,
        notes: `Parcel updated by ${user?.name}, who is the ${user?.role}`,
      },
    },
  });
  const onSubmit = async (data: z.infer<typeof updateAdminParcelSchema>) => {
    console.log(data);
    const t = toast.loading("Loading...");
    try {
      const d = {
        ...data,
        status: data.status as ParcelStatus,
        deliveryDate:
          typeof data.deliveryDate === "string"
            ? new Date(data.deliveryDate)
            : data.deliveryDate,
        trackingId,
      };

      const res = await updateParcel(d).unwrap();
      console.log(res);
      toast.success("Parcel updated successfully", { id: t });
    } catch (err) {
      console.log(err);
      toast.error(
        (err as IError)?.message ||
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (err as any)?.data?.message ||
          "Something went wrong",
        {
          id: t,
        }
      );
    }
  };
  return (
    <div>
      <Dialog>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button
                className="text-foreground bg-muted hover:bg-primary"
                onClick={() => setTrackingId(parcel.trackingId as string)}
              >
                <PencilIcon className="w-4 h-4" />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p className="text-sm">Update</p>
          </TooltipContent>
        </Tooltip>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Parcel</DialogTitle>
            <DialogDescription>Update the parcel details.</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {parcelStatusOptions.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="statusLog.location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Location" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="statusLog.notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Input placeholder="Notes" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deliveryDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value as Date}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date(new Date().setHours(0, 0, 0, 0))
                          }
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default ParcelUpdateModal;
