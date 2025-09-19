"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ParcelTypes =
  | "Document"
  | "Box"
  | "Fragile"
  | "Electronics"
  | "Clothing"
  | "Perishable"
  | "Other";

type ParcelStatus =
  | "Requested"
  | "Approved"
  | "Dispatched"
  | "In Transit"
  | "Delivered"
  | "Cancelled"
  | "Blocked";

interface SearchFilterProps {
  onSearchChange?: (val: string) => void;
  onTypeChange?: (val: ParcelTypes | "all") => void;
  onStatusChange?: (val: ParcelStatus | "all") => void;
}

export function SearchFilter({
  onSearchChange,
  onTypeChange,
  onStatusChange,
}: SearchFilterProps) {
  return (
    <div className="flex flex-wrap gap-4 p-4 border-b bg-muted/30">
      <div className="flex-1 min-w-[200px]">
        <Label className="text-sm">Search</Label>
        <Input
          placeholder="Search parcels..."
          onChange={(e) => {
            onSearchChange?.(e.target.value);
          }}
        />
      </div>

      <div className="min-w-[200px]">
        <Label className="text-sm">Parcel Type</Label>
        <Select
          onValueChange={(val: ParcelTypes) => {
            onTypeChange?.(val);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Document">Document</SelectItem>
            <SelectItem value="Box">Box</SelectItem>
            <SelectItem value="Fragile">Fragile</SelectItem>
            <SelectItem value="Electronics">Electronics</SelectItem>
            <SelectItem value="Clothing">Clothing</SelectItem>
            <SelectItem value="Perishable">Perishable</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="min-w-[200px]">
        <Label className="text-sm">Parcel Status</Label>
        <Select
          value={status}
          onValueChange={(val: ParcelStatus) => {
            onStatusChange?.(val);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Requested">Requested</SelectItem>
            <SelectItem value="Approved">Approved</SelectItem>
            <SelectItem value="Dispatched">Dispatched</SelectItem>
            <SelectItem value="In Transit">In Transit</SelectItem>
            <SelectItem value="Delivered">Delivered</SelectItem>
            <SelectItem value="Cancelled">Cancelled</SelectItem>
            <SelectItem value="Blocked">Blocked</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
