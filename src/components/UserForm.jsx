import React from "react";
import { MenuItem, Stack } from "@mui/material";
import { FormProvider, RHFTextField } from "./hook-form";
import RHFSelect from "./hook-form/RHFSelect";
import { LoadingButton } from "@mui/lab";
import PropTypes from "prop-types";

// -------------------------------------------------------------------------------

const accountStatusLabels = ["active", "deleted"];

const AllRoles = ["admin", "applicant"];

const UserForm = ({
  methods,
  onSubmit,
  isSubmitting,
  form = "addUserForm",
}) => {
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3} sx={{ width: "90%", mx: "auto" }}>
        <RHFTextField name="firstname" label="First Name" />

        <RHFTextField name="lastname" label="Last Name" />

        <RHFTextField name="email" label="Email" />

        <RHFSelect
          name="roles"
          label="Roles"
          InputLabelProps={{ shrink: true }}
          SelectProps={{
            native: false,
            sx: { textTransform: "capitalize" },
          }}
        >
          {AllRoles?.map((option) => (
            <MenuItem
              key={option}
              value={option}
              sx={{
                mx: 1,
                my: 0.5,
                borderRadius: 0.75,
                typography: "body2",
                textTransform: "capitalize",
              }}
            >
              {option}
            </MenuItem>
          ))}
        </RHFSelect>

        <RHFSelect
          name="accountStatus"
          label="Account Status"
          InputLabelProps={{ shrink: true }}
          SelectProps={{
            native: false,
            sx: { textTransform: "capitalize" },
          }}
        >
          {accountStatusLabels?.map((option) => (
            <MenuItem
              key={option}
              value={option}
              sx={{
                mx: 1,
                my: 0.5,
                borderRadius: 0.75,
                typography: "body2",
                textTransform: "capitalize",
              }}
            >
              {option}
            </MenuItem>
          ))}
        </RHFSelect>

        <LoadingButton
          type="submit"
          variant="contained"
          size="large"
          loading={isSubmitting}
        >
          {form === "editUserForm" ? "Update User" : "Add User"}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
};

UserForm.propTypes = {
  methods: PropTypes.object,
  onSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
  form: PropTypes.string,
};

export default UserForm;