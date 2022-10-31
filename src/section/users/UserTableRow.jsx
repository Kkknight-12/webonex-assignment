import PropTypes from "prop-types";
import React, { useState } from "react";
// @mui
import { MenuItem, TableCell, TableRow, Typography } from "@mui/material";
// components
import Label from "../../components/Label";

import Iconify from "../../components/Iconify";
import { TableMoreMenu } from "../../components/table";
import MyAvatar from "../../components/MyAvatar";

// ----------------------------------------------------------------------

UserTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function UserTableRow({ row, onEditRow }) {
  const { firstname, lastname, accountStatus, email, roles, docId } = row;

  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow>
      <TableCell>
        <Typography variant="subtitle2" noWrap>
          <MyAvatar name={firstname} />
        </Typography>
      </TableCell>

      <TableCell>
        <Typography
          sx={{ textTransform: "capitalize" }}
          variant="subtitle2"
          noWrap
        >
          {firstname}
        </Typography>
      </TableCell>

      <TableCell>
        <Typography
          sx={{ textTransform: "capitalize" }}
          variant="subtitle2"
          noWrap
        >
          {lastname}
        </Typography>
      </TableCell>

      <TableCell>
        <Typography variant="subtitle2" noWrap>
          {email}
        </Typography>
      </TableCell>

      <TableCell>
        <Typography
          sx={{ textTransform: "capitalize" }}
          variant="subtitle2"
          noWrap
        >
          {roles}
        </Typography>
      </TableCell>

      <TableCell align="center">
        <Label
          color={(accountStatus === "deleted" && "error") || "success"}
          sx={{ textTransform: "capitalize" }}
        >
          {accountStatus === "active" ? "Active" : "Deleted"}
        </Label>
      </TableCell>

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onEditRow(docId);
                  handleCloseMenu();
                }}
              >
                <Iconify icon={"eva:edit-fill"} />
                Edit
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}