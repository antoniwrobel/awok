import {
  LoginPage,
  HomePage,
  ProtectedPage,
  RegisterPage,
  LoggedIn,
  YourAccount,
  AdminPage,
} from "../pages";

type RouteType = {
  path: string;
  component: () => JSX.Element;
  name: string;
  isProtected?: boolean;
};

const routes: RouteType[] = [
  {
    path: "/",
    component: HomePage,
    name: "AWOK",
  },
  {
    path: "/login",
    component: LoginPage,
    name: "LOGIN",
  },
  {
    path: "/register",
    component: RegisterPage,
    name: "REGISTER",
  },
  {
    path: "/protected",
    component: ProtectedPage,
    name: "AUTH",
    isProtected: true,
  },
  {
    path: "/logged-in",
    component: LoggedIn,
    name: "LOGGED IN",
    isProtected: true,
  },
  {
    path: "/your-account",
    component: YourAccount,
    name: "YOUR ACCOUNT",
    isProtected: true,
  },
  {
    path: "/admin-page",
    component: AdminPage,
    name: "ADMIN PAGE",
    isProtected: true,
  },
];

export default routes;
