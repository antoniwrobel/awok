import PublicPage from "../pages/Public";
import HomePage from "../pages/Home";
import LoginPage from "../pages/Login";

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
