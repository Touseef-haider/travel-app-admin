import { lazy } from "react";
import UnAuth from "./unAuth";
import Auth from "./auth";

const Login = lazy(() => import("../pages/login"));
const Home = lazy(() => import("../pages/home"));
const Alert = lazy(() => import("../pages/alert"));
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
    component: Alert,
    exact: true,
    path: "/alerts",
    title: "Home",
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
