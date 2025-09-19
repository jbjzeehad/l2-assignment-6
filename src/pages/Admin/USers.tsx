import { BlockConfirmation } from "@/components/layout/BlockConfirmation";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useBlockUserMutation, useGetUsersQuery } from "@/store/api/admin.api";
import { BanIcon, ShieldCheckIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function Users() {
  const [page, setPage] = useState(1);
  const [blockUser] = useBlockUserMutation();
  const { data, isLoading } = useGetUsersQuery(
    { page },
    { refetchOnMountOrArgChange: true }
  ); // 👈 Use isLoading

  const handleSubmit = async (id: string, isBlocked: boolean) => {
    const msg = isBlocked
      ? "User blocked successfully"
      : "User unblocked successfully";

    const t = toast.loading("Loading...");
    try {
      await blockUser({ id, isBlocked }).unwrap();
      toast.success(msg, { id: t });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="rounded-md border shadow-sm">
      <h1 className="text-2xl font-bold m-3 text-center text-primary">
        Manage Users
      </h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Name</TableHead>
            <TableHead className="w-[200px]">Email</TableHead>
            <TableHead className="w-[100px]">Role</TableHead>
            <TableHead>Address</TableHead>
            <TableHead className="w-[140px]">Phone</TableHead>
            <TableHead className="text-right w-[120px]">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading
            ? Array.from({ length: 10 }).map((_, i) => (
                <TableRow key={i}>
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
                    <Skeleton className="h-4 w-28" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-8 w-8 rounded-md" />
                  </TableCell>
                </TableRow>
              ))
            : data?.data.map((user) => (
                <TableRow
                  className="hover:bg-muted/50 transition-colors"
                  key={user.email}
                >
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.address}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell className="text-right">
                    {user.isBlocked ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <BlockConfirmation
                            msg="Are you sure you want to unblock this user?"
                            onConfirm={() =>
                              handleSubmit(user._id as string, false)
                            }
                          >
                            <Button className="bg-green-600 hover:bg-green-700">
                              <ShieldCheckIcon className="w-4 h-4 text-white" />
                            </Button>
                          </BlockConfirmation>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                          <p className="text-foreground">UnBlock</p>
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <BlockConfirmation
                            onConfirm={() =>
                              handleSubmit(user._id as string, true)
                            }
                            msg="Are you sure you want to block this user?"
                          >
                            <Button className="bg-red-600 hover:bg-red-700">
                              <BanIcon className="w-4 h-4 text-white" />
                            </Button>
                          </BlockConfirmation>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                          <p className="text-foreground">Block</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
      <Pagination>
        <PaginationContent>
          <PaginationItem className="cursor-pointer">
            <PaginationPrevious onClick={() => page > 1 && setPage(page - 1)} />
          </PaginationItem>

          <PaginationItem className="cursor-pointer">
            <PaginationLink isActive>{page}</PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem className="cursor-pointer">
            <PaginationNext
              onClick={() =>
                data?.meta?.totalPages &&
                data.meta.totalPages > page &&
                setPage(page + 1)
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default Users;
