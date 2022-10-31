import React from "react";

// components
import SvgIconStyle from "../../components/SvgIconStyle";

// ----------------------------------------------------------------------

const getIcon = (name) => (
  <SvgIconStyle
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const ICONS = {
  user: getIcon("ic_user"),
  dashboard: getIcon("ic_dashboard"),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: "dashboard",
    items: [
      { title: "Dashboard", path: "/dashboard/home", icon: ICONS.dashboard },

      { title: "Users", path: "/dashboard/users", icon: ICONS.user },
    ],
  },
];

export default navConfig;