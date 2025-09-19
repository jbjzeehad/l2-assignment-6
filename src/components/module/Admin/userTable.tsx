import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton"; // 👈 Import skeleton
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useBlockUserMutation, useGetUsersQuery } from "@/store/api/admin.api";
import { BanIcon, ShieldCheckIcon } from "lucide-react";

import { BlockConfirmation } from "@/components/layout/BlockConfirmation";
import { useAppSelector } from "@/hooks/redux";
import { toast } from "sonner";
import PaginationGlobal from "../PaginationGlobal";

function UserTable() {
  const page = useAppSelector((state) => state.page.page);
  const [blockUser] = useBlockUserMutation();
  const { data, isLoading } = useGetUsersQuery(
    { page },
    { refetchOnMountOrArgChange: true }
  );

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
    <div>
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
                    ) : (
                      <BlockConfirmation
                        onConfirm={() => handleSubmit(user._id as string, true)}
                        msg="Are you sure you want to block this user?"
                      >
                        <Button className="bg-red-600 hover:bg-red-700">
                          <BanIcon className="w-4 h-4 text-white" />
                        </Button>
                      </BlockConfirmation>
                    )}
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
      {data?.meta && <PaginationGlobal totalPages={data?.meta?.totalPages} />}
    </div>
  );
}
export default UserTable;
