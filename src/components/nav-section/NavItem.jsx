import PropTypes from "prop-types";
import { NavLink as RouterLink } from "react-router-dom";
// @mui
import { Tooltip, Typography } from "@mui/material";
//
import {
  ListItemIconStyle,
  ListItemStyle as ListItem,
  ListItemTextStyle,
} from "./style";

// -------------------------------------------------------------------------------

ListItem.propTypes = {
  children: PropTypes.node,
  roles: PropTypes.arrayOf(PropTypes.string),
};

// -------------------------------------------------------------------------------

NavItemRoot.propTypes = {
  active: PropTypes.bool,
  isCollapse: PropTypes.bool,
  item: PropTypes.shape({
    icon: PropTypes.any,
    path: PropTypes.string,
    title: PropTypes.string,
    caption: PropTypes.string,
  }),
};

export function NavItemRoot({ item, isCollapse, active }) {
  const { title, path, icon, caption } = item;

  const renderContent = (
    <>
      {icon && (
        <ListItemIconStyle isCollapse={isCollapse}>{icon}</ListItemIconStyle>
      )}
      <ListItemTextStyle
        disableTypography
        primary={title}
        secondary={
          <Tooltip title={caption || ""} arrow>
            <Typography
              noWrap
              variant="caption"
              component="div"
              sx={{ textTransform: "initial", color: "text.secondary" }}
            >
              {caption}
            </Typography>
          </Tooltip>
        }
        isCollapse={isCollapse}
      />
    </>
  );

  return (
    <ListItem component={RouterLink} to={path} activeRoot={active}>
      {renderContent}
    </ListItem>
  );
}