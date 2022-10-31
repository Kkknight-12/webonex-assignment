import { useLocation } from "react-router-dom";
//
import { NavItemRoot } from "./NavItem";
import { getActive } from ".";

// // -------------------------------------------------------------------------------

export function NavListRoot({ list, isCollapse }) {
  const { pathname } = useLocation();

  const active = getActive(list.path, pathname);

  return <NavItemRoot item={list} active={active} isCollapse={isCollapse} />;
}