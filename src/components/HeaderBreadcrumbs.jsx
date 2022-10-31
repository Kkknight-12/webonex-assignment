import PropTypes from "prop-types";
// @mui
import { Box, Typography } from "@mui/material";
//
import Breadcrumbs from "./Breadcrumbs";

// ----------------------------------------------------------------------

HeaderBreadcrumbs.propTypes = {
  links: PropTypes.array,
  action: PropTypes.node,
  heading: PropTypes.string.isRequired,
  moreLink: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  sx: PropTypes.object,
};

export default function HeaderBreadcrumbs({
  links,
  action,
  heading,
  moreLink = "" || [],
  sx,
  ...other
}) {
  return (
    <Box sx={{ mb: 5, ...sx }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: 1,
        }}
      >
        <Box
          sx={{
            flexGrow: 2,
            textAlign: "left",
          }}
        >
          <Breadcrumbs links={links} {...other} />
          <Typography variant="h4" gutterBottom sx={{ color: "#1A253C" }}>
            {heading}
          </Typography>
        </Box>

        {action && <Box sx={{ flexGrow: 1 }}>{action}</Box>}
      </Box>
    </Box>
  );
}