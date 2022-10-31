import React, { useEffect, useState } from "react";
// firebase
import { getAllUsers } from "../../services/firebase";
// @mui
import {
  Box,
  Button,
  Card,
  Container,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
} from "@mui/material";
// components
import Iconify from "../../components/Iconify";
import { TableHeadCustom, TableNoData } from "../../components/table";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import useTable from "../../components/table/UseTable";
import BasicModal from "../../components/Modal";
// section
import UserTableToolbar from "../../section/users/UserTableToolbar";
import UserTableRow from "../../section/users/UserTableRow";
//
import AddUserDrawer from "../../Drawer";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "avatar", label: "Avatar", align: "left" },
  { id: "first name", label: "First name", align: "left" },
  { id: "last name", label: "Last name", align: "left" },
  { id: "email", label: "Email", align: "left" },
  { id: "roles", label: "Roles", align: "left" },
  { id: "status", label: "Account Status", align: "center", width: 180 },
  { id: "" },
];

// -----------------------------------------------------------------------------

const Users = () => {
  const [tableData, setTableData] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editDoc, setEditDoc] = useState(null);

  const toggleDrawer = (modalOpen) => {
    setDrawerOpen(modalOpen);
  };

  const setEditDocumentId = (id) => {
    const [editDocument] = tableData.filter((doc) => doc.docId === id);

    setEditDoc({ ...editDocument, docId: id });
  };

  const { page, rowsPerPage, setPage, onChangePage, onChangeRowsPerPage } =
    useTable();

  useEffect(() => {
    getAllUsers()
      .then((data) => setTableData(data))
      .then(() => setIsLoading(false));
  }, [drawerOpen, modalOpen]);

  const handleFilterName = (filterName) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const dataFiltered = applyFilter({
    tableData,
    filterName,
  });

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!isLoading && !dataFiltered.length);

  return (
    <Container
      maxWidth={"lg"}
      sx={{
        background: "rgba(178,178,178,0.25)",
        p: 2,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <HeaderBreadcrumbs
        heading="Manage Users"
        links={[{ name: "Dashboard", href: "/users" }, { name: "Users" }]}
        action={
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              py: 1,
              justifyContent: { xs: "center", md: "flex-end" },
              alignItems: "center",
              ml: 2,
            }}
          >
            <UserTableToolbar
              sx={{ width: "100%" }}
              filterName={filterName}
              onFilterName={handleFilterName}
            />
            <Box>
              <Button
                variant="contained"
                sx={{
                  height: { sm: "40px" },
                  whiteSpace: { sm: "noWrap" },
                }}
                startIcon={<Iconify icon="eva:plus-fill" />}
                onClick={() => setModalOpen(true)}
              >
                New User
              </Button>
            </Box>
          </Box>
        }
      />

      <Card>
        <TableContainer sx={{ position: "relative" }}>
          <Table size={"medium"}>
            <TableHeadCustom
              headLabel={TABLE_HEAD}
              rowCount={tableData.length}
            />

            <TableBody>
              {(isLoading ? [...Array(rowsPerPage)] : dataFiltered)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <UserTableRow
                    key={row.docId}
                    row={row}
                    onEditRow={(id) => {
                      toggleDrawer(true);
                      setEditDocumentId(id);
                    }}
                  />
                ))}
              <TableNoData isNotFound={isNotFound} />
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ position: "relative" }}>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={dataFiltered.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
          />
        </Box>
      </Card>

      <BasicModal handleClose={handleClose} modalOpen={modalOpen} />

      <AddUserDrawer
        toggleDrawer={toggleDrawer}
        drawerOpen={drawerOpen}
        editDoc={editDoc}
      />
    </Container>
  );
};

export default Users;

function applyFilter({ tableData, filterName }) {
  if (filterName) {
    tableData = tableData.filter(
      (item) =>
        item.firstname.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return tableData;
}