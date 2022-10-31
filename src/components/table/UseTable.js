import { useState } from "react";
// ----------------------------------------------------------------------

export default function useTable(props) {
  const [page, setPage] = useState(props?.defaultCurrentPage || 0);

  const [rowsPerPage, setRowsPerPage] = useState(
    props?.defaultRowsPerPage || 5
  );

  const onChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const onChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return {
    page,
    setPage,
    rowsPerPage,
    onChangePage,
    onChangeRowsPerPage,
  };
}