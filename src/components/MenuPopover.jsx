import PropTypes from "prop-types";
// @mui
import { Popover } from "@mui/material";

MenuPopover.propTypes = {
  sx: PropTypes.object,
  children: PropTypes.node,
  disabledArrow: PropTypes.bool,
  arrow: PropTypes.oneOf(["right-top", "right-center", "right-bottom"]),
};
export default function MenuPopover({
  children,
  arrow = "top-right",
  disabledArrow,
  sx,
  ...other
}) {
  return (
    <Popover
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      PaperProps={{
        sx: {
          p: 1,
          overflow: "inherit",
          ...sx,
        },
      }}
      {...other}
    >
      {children}
    </Popover>
  );
}