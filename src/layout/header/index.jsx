import React from "react";
import { AppBar } from "@mui/material";
import { styled } from "@mui/material/styles";
import Header from "../../components/Header";
import { HEADER, NAVBAR } from "../cssUtils";

// -------------------------------------------------------------------------------

const RootStyle = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "isCollapse",
})(({ isCollapse, theme }) => ({
  boxShadow: "none",
  height: HEADER.MOBILE_HEIGHT,
  color: "black",
  backgroundColor: theme.palette.background.default,
  width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH}px)`,
  ...(isCollapse && {
    width: `calc(100% - ${NAVBAR.DASHBOARD_COLLAPSE_WIDTH}px)`,
  }),
}));

const DashboardHeader = ({ isCollapse = false }) => {
  return (
    <RootStyle isCollapse={isCollapse}>
      <Header />
    </RootStyle>
  );
};

DashboardHeader.propTypes = {};

export default DashboardHeader;