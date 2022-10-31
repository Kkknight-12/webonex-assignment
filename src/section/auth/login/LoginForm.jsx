import * as Yup from "yup";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import { Alert, Button, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// hooks
import useIsMountedRef from "../../../hooks/useIsMountedRef";
// components
import { FormProvider, RHFTextField } from "../../../components/hook-form";
import { useNavigate } from "react-router-dom";
import { signInUser, signInUserWithGoogle } from "../../../services/firebase";
import GoogleButton from "react-google-button";

// -------------------------------------------------------------------------------

export default function LoginForm() {
  const isMountedRef = useIsMountedRef();
  const history = useNavigate();

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const defaultValues = {
    email: "abc@gmail.com",
    password: "abc123",
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const handleGoogleLogin = () => {
    signInUserWithGoogle().then(() => history("/dashboard/home"));
  };

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await signInUser(data.email, data.password);
      history("/dashboard/home");
    } catch (error) {
      console.error("ERROR", error);
      reset();

      if (isMountedRef.current) {
        setError("afterSubmit", { ...error, message: error.message });
      }
    }
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {!!errors.afterSubmit && (
            <Alert severity="error">{errors.afterSubmit.message}</Alert>
          )}

          <RHFTextField name="email" label="Email address" />

          <RHFTextField name="password" label="Password" type={"password"} />

          <Stack
            sx={{
              width: "100%",
              alignItems: "center",
            }}
          >
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
              sx={{
                textTransform: "capitalize",
                background: "#43AFFF",
                borderRadius: 0.6,
                width: "150px",
                "&:hover": {
                  backgroundColor: "#1694f1",
                  boxShadow: "none",
                },
              }}
            >
              Login
            </LoadingButton>
          </Stack>
        </Stack>
      </FormProvider>
      <Stack sx={{ alignItems: "center", justifyContent: "center" }}>
        <Typography
          sx={{
            mt: 4,
          }}
        >
          Or
        </Typography>
        <GoogleButton
          onClick={handleGoogleLogin}
          style={{
            marginTop: 20,
            textTransform: "capitalize",
            background: "#43AFFF",
            borderRadius: 0.6,
            "&:hover": {
              backgroundColor: "#1694f1",
              boxShadow: "none",
            },
          }}
        />
      </Stack>
    </>
  );
}