import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { nextPage, prevPage } from "@/store/slice/page.slice";

function PaginationGlobal({ totalPages }: { totalPages: number }) {
  const page = useAppSelector((state) => state.page.page);
  const dispatch = useAppDispatch();
  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem className="cursor-pointer">
            <PaginationPrevious onClick={() => dispatch(prevPage())} />
          </PaginationItem>

          <PaginationItem className="cursor-pointer">
            <PaginationLink isActive>{page}</PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem className="cursor-pointer">
            <PaginationNext onClick={() => dispatch(nextPage(totalPages))} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
export default PaginationGlobal;
