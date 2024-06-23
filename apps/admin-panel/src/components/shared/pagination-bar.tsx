import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useEffect, useState } from 'react';

type PaginationBarProps = {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

function PaginationBar({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationBarProps) {
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);

  useEffect(() => {
    const numbers = [];
    for (let i = 1; i <= totalPages; i++) {
      numbers.push(i);
    }
    setPageNumbers([...numbers]);
  }, [totalPages]);

  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious onClick={() => onPageChange(currentPage - 1)} />
          </PaginationItem>
        )}
        {pageNumbers.map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              isActive={currentPage === pageNumber}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext onClick={() => onPageChange(currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationBar;
