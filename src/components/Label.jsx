import PropTypes from "prop-types";
// @mui
import { alpha, styled } from "@mui/material/styles";

// ----------------------------------------------------------------------

const RootStyle = styled("span")(({ theme, ownerState }) => {
  const { color } = ownerState;

  return {
    height: 22,
    minWidth: 22,
    lineHeight: 0,
    borderRadius: 6,
    cursor: "default",
    alignItems: "center",
    whiteSpace: "nowrap",
    display: "inline-flex",
    justifyContent: "center",
    padding: theme.spacing(0, 1),
    color: theme.palette.common.white,
    fontSize: theme.typography.pxToRem(12),
    fontFamily: theme.typography.fontFamily,
    backgroundColor: alpha(theme.palette[color].main, 0.9),
    fontWeight: theme.typography.fontWeightBold,
  };
});

// ----------------------------------------------------------------------

Label.propTypes = {
  children: PropTypes.node,
  color: PropTypes.oneOf(["success", "error"]),
  sx: PropTypes.object,
};

export default function Label({
  children,
  color = "default",

  sx,
}) {
  return <RootStyle ownerState={{ color }}>{children}</RootStyle>;
}