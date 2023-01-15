import { lazy } from "react";
import UnAuth from "./unAuth";
import Auth from "./auth";

const Login = lazy(() => import("../pages/login"));
const Home = lazy(() => import("../pages/home"));
const MapLocation = lazy(() => import("../pages/mapLocation"));
const Province = lazy(() => import("../pages/province"));
const Category = lazy(() => import("../pages/category"));
const Account = lazy(() => import("../pages/account"));

export const ROUTES = [
  {
    component: Login,
    exact: true,
    path: "/login",
    title: "Login",
    route: UnAuth,
  },
  {
    component: Home,
    exact: true,
    path: "/",
    title: "Home",
    route: Auth,
  },
  {
    component: MapLocation,
    exact: true,
    path: "/alerts",
    title: "Home",
    route: Auth,
  },
  {
    component: Category,
    exact: true,
    path: "/category",
    title: "Category",
    route: Auth,
  },
  {
    component: Province,
    exact: true,
    path: "/province",
    title: "Province",
    route: Auth,
  },
  {
    component: Account,
    exact: true,
    path: "/account",
    title: "My Account",
    route: Auth,
  },
];
