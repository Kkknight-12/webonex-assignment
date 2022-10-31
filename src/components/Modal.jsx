import * as React from "react";
import PropTypes from "prop-types";
// @mui
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
// components
import AddUser from "../section/users/AddUser";

// -------------------------------------------------------------------------------

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: 2,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  width: "60%",
};

const BasicModal = ({
  modalOpen,
  handleClose,
  candidateData,
  setCandidates,
  ...other
}) => {
  return (
    <div>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Button
            sx={{
              position: "absolute",
              top: 15,
              right: 25,
              color: "#303f60",
              textTransform: "none",
            }}
            onClick={handleClose}
          >
            <CloseIcon />
          </Button>
          <AddUser sx={{ mt: 5 }} handleClose={handleClose} />
        </Box>
      </Modal>
    </div>
  );
};

BasicModal.propTypes = {
  handleClose: PropTypes.func,
  modalOpen: PropTypes.bool,
  candidateData: PropTypes.object,
  setCandidates: PropTypes.func,
};

export default BasicModal;