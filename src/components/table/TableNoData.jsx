import PropTypes from "prop-types";
// @mui
import { TableRow, TableCell, Typography } from "@mui/material";

// ----------------------------------------------------------------------

TableNoData.propTypes = {
  isNotFound: PropTypes.bool,
};

export default function TableNoData({ isNotFound }) {
  return (
    <TableRow>
      {isNotFound ? (
        <TableCell colSpan={12}>
          <Typography>No Data</Typography>
        </TableCell>
      ) : (
        <TableCell colSpan={12} sx={{ p: 0 }} />
      )}
    </TableRow>
  );
}