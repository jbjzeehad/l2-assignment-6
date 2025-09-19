"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useCreateParcelMutation } from "@/store/api/sender.api";
import type { IError, ParcelTypes } from "@/types";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { toast } from "sonner";

const createParcelSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(50, "Title must be at most 50 characters long"),
  weight: z.number().positive("Weight must be a positive number"),
  fee: z.number().positive("Fee must be a positive number"),
  deliveryDate: z.union([z.string(), z.date()]).optional(),
  receiverEmail: z.email(),
  type: z.string(),
});

type ParcelFormValues = z.infer<typeof createParcelSchema>;
const parcelTypes: ParcelTypes[] = [
  "Box",
  "Clothing",
  "Document",
  "Electronics",
  "Fragile",
  "Perishable",
  "Other",
];

export default function CreateParcelForm() {
  const [createParcel] = useCreateParcelMutation();
  const form = useForm<ParcelFormValues>({
    resolver: zodResolver(createParcelSchema),
    defaultValues: {
      title: "",
      weight: 0,
      deliveryDate: new Date(),
      receiverEmail: "",
      fee: 0,
      type: undefined,
    },
  });

  const onSubmit = async (data: ParcelFormValues) => {
    console.log(data);
    const t = toast.loading("Creating parcel...");
    try {
      const d = {
        ...data,
        fee: Number(data.fee),
        weight: Number(data.weight),
        type: data.type as ParcelTypes,
        deliveryDate:
          typeof data.deliveryDate === "string"
            ? new Date(data.deliveryDate)
            : data.deliveryDate,
      };
      const res = await createParcel(d).unwrap();
      console.log(res);
      toast.success("Parcel created successfully", {
        id: t,
      });
    } catch (error) {
      console.log(error);
      toast.error(
        (error as IError)?.message ||
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (error as any)?.data?.message ||
          "Something went wrong",
        {
          id: t,
        }
      );
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Parcel title" {...field} />
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
                <FormLabel>Delivery Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
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
                  <PopoverContent className="p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value as Date}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="receiverEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Receiver Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="receiver@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex gap-5">
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Weight (kg)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter weight"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fee"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Fee (BDT)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter fee"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {parcelTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full">
            Create Parcel
          </Button>
        </form>
      </Form>
    </div>
  );
}
