import React, { useState } from "react";
import { Outlet } from "react-router-dom";
// @mui
import { Box } from "@mui/material";
import useCollapseDrawer from "../hooks/useCollapseDrawer";
import Sidebar from "./navbar/Sidebar";
import { styled } from "@mui/material/styles";
import DashboardHeader from "./header";
import { HEADER, NAVBAR } from "./cssUtils";

// -------------------------------------------------------------------------------

const MainStyle = styled("main", {
  shouldForwardProp: (prop) => prop !== "collapseClick",
})(({ theme }) => ({
  flexGrow: 1,
  paddingTop: HEADER.MOBILE_HEIGHT + 24,
  paddingLeft: 16,
  paddingBottom: HEADER.DASHBOARD_DESKTOP_HEIGHT + 24,
  width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH}px)`,
  transition: theme.transitions.create("margin-left", {
    duration: theme.transitions.duration.shorter,
  }),
}));

// -------------------------------------------------------------------------------

export default function DashboardLayout() {
  const { collapseClick, isCollapse } = useCollapseDrawer();

  const [open, setOpen] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: 1,
      }}
    >
      <DashboardHeader isCollapse={isCollapse} />
      <Sidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      <MainStyle collapseClick={collapseClick}>
        <Outlet />
      </MainStyle>
    </Box>
  );
}