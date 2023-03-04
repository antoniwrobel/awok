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
  isPublicOnly?: boolean;
  translKey: string;
};

const routes: RouteType[] = [
  {
    path: "/",
    component: HomePage,
    name: "AWOK",
    translKey: "go-to-public",
  },
  {
    path: "/login",
    component: LoginPage,
    name: "LOGIN",
    isPublicOnly: true,
    translKey: "go-to-login",
  },
  {
    path: "/register",
    component: RegisterPage,
    name: "REGISTER",
    isPublicOnly: true,
    translKey: "go-to-register",
  },
  {
    path: "/protected",
    component: ProtectedPage,
    name: "AUTH",
    isProtected: true,
    translKey: "go-to-protected",
  },
  {
    path: "/logged-in",
    component: LoggedIn,
    name: "LOGGED IN",
    isProtected: true,
    translKey: "go-to-logged-in",
  },
  {
    path: "/your-account",
    component: YourAccount,
    name: "YOUR ACCOUNT",
    isProtected: true,
    translKey: "go-to-your-account",
  },
  {
    path: "/admin-page",
    component: AdminPage,
    name: "ADMIN PAGE",
    isProtected: true,
    translKey: "go-to-admin-page",
  },
];

export default routes;
