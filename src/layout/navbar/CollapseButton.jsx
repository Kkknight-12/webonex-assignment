import PropTypes from "prop-types";
// @mui
import { Box, Button } from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

// ----------------------------------------------------------------------

CollapseButton.propTypes = {
  collapseClick: PropTypes.bool,
  onToggleCollapse: PropTypes.func,
};

export default function CollapseButton({ onToggleCollapse, collapseClick }) {
  return (
    <Button onClick={onToggleCollapse}>
      <Box
        sx={{
          lineHeight: 0,
          transition: (theme) =>
            theme.transitions.create("transform", {
              duration: theme.transitions.duration.shorter,
            }),
          ...(collapseClick && {
            transform: "rotate(180deg)",
          }),
        }}
      >
        <DoubleArrowIcon />
      </Box>
    </Button>
  );
}

// ----------------------------------------------------------------------