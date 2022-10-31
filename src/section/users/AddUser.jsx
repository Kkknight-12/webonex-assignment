import React from "react";
import { Box } from "@mui/material";
import useIsMountedRef from "../../hooks/useIsMountedRef";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { createUser } from "../../services/firebase";
import UserForm from "../../components/UserForm";
import PropTypes from "prop-types";

// ----------------------------------------------------------------------

const AddUser = ({ sx, handleClose }) => {
  const isMountedRef = useIsMountedRef();

  const LoginSchema = Yup.object().shape({
    firstname: Yup.string().required("Firstname is required"),
    lastname: Yup.string().required("Lastname is required"),
    roles: Yup.string().required("Roles is required"),
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    accountStatus: Yup.string().required("Account Status is required"),
  });

  const defaultValues = {
    firstname: "",
    lastname: "",
    email: "",
    roles: "admin",
    accountStatus: "active",
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await createUser(
        data.firstname,
        data.lastname,
        data.email,
        data.roles,
        data.accountStatus
      ).then(() => handleClose());
      reset();
    } catch (error) {
      console.error("ERROR", error);
      reset();

      if (isMountedRef.current) {
        setError("afterSubmit", { ...error, message: error.message });
      }
    }
  };

  return (
    <Box sx={{ ...sx }}>
      <UserForm
        onSubmit={handleSubmit(onSubmit)}
        methods={methods}
        isSubmitting={isSubmitting}
      />
    </Box>
  );
};

AddUser.propTypes = {
  sx: PropTypes.object,
  handleClose: PropTypes.func,
};

export default AddUser;