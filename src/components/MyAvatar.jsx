import { Avatar } from "@mui/material";
import PropTypes from "prop-types";

// -------------------------------------------------------------------------------

const MyAvatar = ({ name, ...other }) => {
  function getFirstCharacter(avatarName) {
    return avatarName && avatarName.charAt(0).toUpperCase();
  }

  return (
    <Avatar
      src={"user?.name"}
      alt={"user?.name"}
      sx={{
        backgroundColor: "#D9EFFF",
        color: "#1A253C",
      }}
      {...other}
    >
      {getFirstCharacter(name)}
    </Avatar>
  );
};

MyAvatar.propTypes = {
  name: PropTypes.string,
  other: PropTypes.object,
};

export default MyAvatar;