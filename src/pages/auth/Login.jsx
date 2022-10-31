import React from "react";
// @mui
import { Box, Typography } from "@mui/material";
// sections
import { LoginForm } from "../../section/auth/login";

// -------------------------------------------------------------------------------

function Login() {
  return (
    <Box
      style={{
        mx: "auto",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: { xs: "300px", md: "500px", lg: "600px" },
          ml: "50%",
          mr: "50%",
          transform: "translate(-50%, 30%)",
          minHeight: "350px",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: 3,
          zIndex: 10,
        }}
      >
        <Typography sx={{ marginBottom: "20px" }}>Login Form</Typography>
        <LoginForm />
      </Box>
    </Box>
  );
}

export default Login;