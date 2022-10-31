import PropTypes from "prop-types";
// @mui
import { Stack, TextField } from "@mui/material";

// ----------------------------------------------------------------------

UserTableToolbar.propTypes = {
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function UserTableToolbar({ filterName, onFilterName }) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        py: 1,
        width: "100%",
        justifyContent: { xs: "center", md: "flex-start" },
      }}
    >
      <TextField
        value={filterName}
        onChange={(event) => onFilterName(event.target.value)}
        placeholder="Search Users..."
      />
    </Stack>
  );
}