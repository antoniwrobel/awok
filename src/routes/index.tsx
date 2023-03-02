import { LoginPage, HomePage, ProtectedPage, RegisterPage } from "../pages";

type RouteType = {
  path: string;
  component: () => JSX.Element;
  name: string;
  isProtected?: boolean;
};

const routes: RouteType[] = [
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
    path: "/",
    component: HomePage,
    name: "AWOK",
  },
  {
    path: "/protected",
    component: ProtectedPage,
    name: "AUTH",
    isProtected: true,
  },
];

export default routes;
