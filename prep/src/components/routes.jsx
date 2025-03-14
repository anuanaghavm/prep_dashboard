import React from "react";
import Staticlayout from "./Staticlayout";
import Home from "./home";
import Login from "../components/login/Login";
import Dashboard from "../components/dashboard";
import Blogcategory from "./blogs/Blogcategory";

const routes = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <Staticlayout>
        <Dashboard />
      </Staticlayout>
    ),
  },
  {
    path: "/home",
    element: (
      <Staticlayout>
        <Home />
      </Staticlayout>
    ),
  },
  {
    path: "/blogcategories",
    element: (
      <Staticlayout>
        <Blogcategory />
      </Staticlayout>
    ),
  },
];

export default routes;