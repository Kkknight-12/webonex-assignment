import PropTypes from "prop-types";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
import { Box, Drawer, Stack } from "@mui/material";
// hooks
import useCollapseDrawer from "../../hooks/useCollapseDrawer";
// components
import NavSectionVertical from "../../components/nav-section/Navbar";
import navConfig from "./NavbarConfig";
import CollapseButton from "./CollapseButton";
import { NAVBAR } from "../cssUtils";

// -------------------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    transition: theme.transitions.create("width", {
      duration: theme.transitions.duration.shorter,
    }),
  },
}));

// -------------------------------------------------------------------------------

Sidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function Sidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();

  const {
    isCollapse,
    collapseClick,
    onToggleCollapse,
    onHoverEnter,
    onHoverLeave,
  } = useCollapseDrawer();

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <>
      <Stack
        spacing={3}
        sx={{
          pt: 3,
          pb: 2,
          px: 2.5,
          flexShrink: 0,
          ...(isCollapse && { alignItems: "center" }),
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="flex-end">
          {!isCollapse && (
            <CollapseButton
              onToggleCollapse={onToggleCollapse}
              collapseClick={collapseClick}
            />
          )}
        </Stack>
      </Stack>
      <NavSectionVertical navConfig={navConfig} isCollapse={isCollapse} />
      <Box sx={{ flexGrow: 1 }} />
    </>
  );

  return (
    <RootStyle
      sx={{
        width: isCollapse
          ? NAVBAR.DASHBOARD_COLLAPSE_WIDTH
          : NAVBAR.DASHBOARD_WIDTH,
      }}
    >
      <Drawer
        open
        variant="persistent"
        onMouseEnter={onHoverEnter}
        onMouseLeave={onHoverLeave}
        PaperProps={{
          sx: {
            border: 0,
            width: NAVBAR.DASHBOARD_WIDTH,
            bgcolor: "#f6f6f6",
            transition: (theme) =>
              theme.transitions.create("width", {
                duration: theme.transitions.duration.standard,
              }),
            ...(isCollapse && {
              width: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
            }),
          },
        }}
      >
        {renderContent}
      </Drawer>
    </RootStyle>
  );
}