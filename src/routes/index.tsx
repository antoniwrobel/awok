import { LoginPage, HomePage, PublicPage } from "../pages";

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
    path: "/",
    component: PublicPage,
    name: "AWOK",
  },
  {
    path: "/protected",
    component: HomePage,
    name: "AUTH",
    isProtected: true,
  },
];

export default routes;
