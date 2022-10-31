import * as React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { updateUser } from "./services/firebase";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import useIsMountedRef from "./hooks/useIsMountedRef";
import * as Yup from "yup";
import UserForm from "./components/UserForm";
import PropTypes from "prop-types";

// ----------------------------------------------------------------------

AddUserDrawer.propTypes = {
  toggleDrawer: PropTypes.func,
  drawerOpen: PropTypes.bool,
  editDoc: PropTypes.object,
};

export default function AddUserDrawer({ toggleDrawer, drawerOpen, editDoc }) {
  const [formData, setFormData] = useState(null);
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
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await updateUser(
        data.firstname,
        data.lastname,
        data.email,
        data.roles,
        data.accountStatus,
        editDoc.docId
      ).then(() => toggleDrawer(false));
      reset();
    } catch (error) {
      console.error("ERROR", error);
      reset();

      if (isMountedRef.current) {
        setError("afterSubmit", { ...error, message: error.message });
      }
    }
  };

  // effect runs on component mount
  useEffect(() => {
    setFormData(editDoc);
    // return () => setFormData(null);
  }, [editDoc]);

  useEffect(() => {
    // reset form with user data
    reset(formData);
  }, [formData]);

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 350 }}
      marginTop={10}
      role="presentation"
      // onClick={() => toggleDrawer(false)}
      // onKeyDown={() => toggleDrawer(false)}
    >
      {formData && (
        <UserForm
          onSubmit={handleSubmit(onSubmit)}
          methods={methods}
          isSubmitting={isSubmitting}
          form={"editUserForm"}
        />
      )}
    </Box>
  );

  return (
    <div>
      <>
        <Drawer
          anchor={"right"}
          open={drawerOpen}
          onClose={() => toggleDrawer(false)}
        >
          {list("right")}
        </Drawer>
      </>
    </div>
  );
}