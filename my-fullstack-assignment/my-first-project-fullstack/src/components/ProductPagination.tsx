import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setPage } from "../store/slices/product.slice";

const ProductPagination: React.FC = () => {
  const dispatch = useAppDispatch();
  const { pagination } = useAppSelector((state) => state.products);
  const { page, limit, total } = pagination;

  const totalPages = Math.ceil(total / limit);

  if (totalPages <= 1) return null;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => page > 1 && dispatch(setPage(page - 1))}
            className={
              page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
            }
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            onClick={() => page < totalPages && dispatch(setPage(page + 1))}
            className={
              page === totalPages
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default ProductPagination;
