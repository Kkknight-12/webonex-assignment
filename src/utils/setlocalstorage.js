export const setSession = (accessToken, userName) => {
  // console.log("accessToken", accessToken);
  if (accessToken) {
    const currentUserName = JSON.stringify(userName);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("user", currentUserName);
    localStorage.setItem("auth", JSON.stringify(1));
  } else {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("accessUser");
  }
};

export const removeSession = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("accessUser");
};