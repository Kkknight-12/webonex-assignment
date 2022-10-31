import PropTypes from "prop-types";
// @mui
import { Box, List } from "@mui/material";
//
import { NavListRoot } from "./NavList";

// -------------------------------------------------------------------------------

NavSectionVertical.propTypes = {
  isCollapse: PropTypes.bool,
  navConfig: PropTypes.array,
};

export default function NavSectionVertical({
  navConfig,
  isCollapse = false,
  ...other
}) {
  return (
    <Box sx={{ mt: 7 }} {...other}>
      {navConfig.map((group) => (
        <List key={group.subheader} disablePadding sx={{ px: 2 }}>
          {group.items.map((list) => (
            <NavListRoot
              key={list.title + list.path}
              list={list}
              isCollapse={isCollapse}
            />
          ))}
        </List>
      ))}
    </Box>
  );
}