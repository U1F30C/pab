import ReactPaginate from "react-paginate";
import { PaginatorData } from "../../../utils/paginator-data";

interface AppPaginatorProps extends PaginatorData {
  totalCount: number;
  onPaginationChange: (newPageIndex: number) => void;
}

export default function AppPaginator(props: AppPaginatorProps) {
  return (
    <ReactPaginate
      previousLabel={"←"}
      nextLabel={"→"}
      breakLabel={"..."}
      breakClassName={"break-me"}
      forcePage={props.pageIndex}
      pageCount={Math.ceil(
        (props.totalCount || 0) / (props.pageSize || 1) || 1
      )}
      marginPagesDisplayed={8}
      pageRangeDisplayed={props.pageSize}
      onPageChange={(paginationEvent) => {
        props.onPaginationChange(paginationEvent.selected);
      }}
      containerClassName={"pagination issuesPagination"}
      activeClassName={"selected"}
    />
  );
}
