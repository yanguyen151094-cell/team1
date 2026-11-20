import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import Register from "../pages/register/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dang-ky",
    element: <Register />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;