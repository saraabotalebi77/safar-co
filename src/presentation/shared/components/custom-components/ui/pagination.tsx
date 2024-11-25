import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/presentation/shared/components/shadcn-components/components/ui/pagination";
import { setState } from "@/presentation/shared/types";
import { FC } from "react";

interface IPropsComponent {
  currentPage: number;
  setCurrentPage: setState<number>;
  totalPages: number;
}

const CustomizedPagination: FC<IPropsComponent> = ({
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem
          onClick={() =>
            setCurrentPage(currentPage - 1 == 0 ? 1 : currentPage - 1)
          }
        >
          <PaginationPrevious className={`cursor-pointer hover:bg-white ${currentPage==1 ? "opacity-35 pointer-events-none" : "opacity-100 pointer-events-auto"}`}/>
        </PaginationItem>
        {Array(totalPages)
          .fill("")
          .map((page, index) => (
            <PaginationItem
              key={index}
              onClick={() => setCurrentPage(index + 1)}
            >
              <PaginationLink
                className={`cursor-pointer ${
                  index + 1 == currentPage
                    ? "bg-accent-300 hover:bg-accent-300 text-white hover:text-white"
                    : "bg-gray-400 hover:bg-gray-400"
                } `}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
        <PaginationItem
          onClick={() =>
            setCurrentPage(
              currentPage + 1 > totalPages ? totalPages : currentPage + 1
            )
          }
        >
          <PaginationNext className={`cursor-pointer hover:bg-white ${currentPage==totalPages ?  "opacity-35 pointer-events-none" : "opacity-100 pointer-events-auto"}`}/>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
export default CustomizedPagination;
