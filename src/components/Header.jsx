import React, { useEffect, useState } from "react";
// @mui
import {
  Box,
  Button,
  IconButton,
  Link,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
//
import { useNavigate } from "react-router-dom";
// components
import MyAvatar from "./MyAvatar";
import { signOutUser } from "../services/firebase";

// -------------------------------------------------------------------------------

const Header = () => {
  const [open, setOpen] = useState(null);

  const [currentUser, setCurrentUser] = useState("Admin");

  const navigate = useNavigate();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  useEffect(() => {
    const currentUserName = JSON.parse(localStorage.getItem("user"));

    if (currentUserName) {
      setCurrentUser(currentUserName);
    }
  }, [currentUser]);

  return (
    <Box
      sx={{
        px: "30px",
        height: "300px",
        zIndex: 10,
        background: "#f6f6f6",
      }}
    >
      <Stack
        spacing={3}
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{
          paddingTop: "10px",
          paddingBottom: "10px",
          width: "100%",
        }}
      >
        <Link
          href={"/welcome"}
          sx={{ textDecoration: "none", cursor: "pointer" }}
        >
          <Typography sx={{ fontWeight: "bold", color: "#1A253C" }}>
            MANAGEMENT
          </Typography>
        </Link>
        <div>
          <IconButton
            className="button-Icon-mui"
            onClick={handleOpen}
            sx={{
              p: 0,
            }}
          >
            <MyAvatar name={currentUser} />
          </IconButton>
        </div>
      </Stack>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          "& .MuiMenuItem-root": {
            typography: "body2",
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ width: "100px", textAlign: "left", pl: 1 }}>
          <Button
            sx={{ textTransform: "capitalize", color: "#303F60" }}
            onClick={() => signOutUser().then(() => navigate("/login"))}
          >
            Logout
          </Button>
        </Box>
      </Popover>
      <div style={{ borderTop: "0.4px solid #ccc", borderColor: "#396ba7" }} />
    </Box>
  );
};

export default Header;