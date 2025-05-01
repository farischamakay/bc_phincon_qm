import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
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

  // Create page numbers array for rendering
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // If there are 5 or fewer pages, show all of them
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include page 1
      pageNumbers.push(1);

      // Calculate start and end of page numbers to show
      let startPage = Math.max(2, page - 1);
      let endPage = Math.min(totalPages - 1, page + 1);

      // Adjust to ensure we show 3 pages in the middle
      if (startPage === 2) {
        endPage = Math.min(totalPages - 1, startPage + 2);
      } else if (endPage === totalPages - 1) {
        startPage = Math.max(2, endPage - 2);
      }

      // Add ellipsis if needed
      if (startPage > 2) {
        pageNumbers.push("...");
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      // Add ellipsis if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push("...");
      }

      // Always include last page
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

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

        {getPageNumbers().map((pageNum, idx) => (
          <PaginationItem key={idx}>
            {pageNum === "..." ? (
              <span className="px-4 py-2">...</span>
            ) : (
              <PaginationLink
                isActive={page === pageNum}
                onClick={() => dispatch(setPage(pageNum as number))}
                className="cursor-pointer"
              >
                {pageNum}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

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
