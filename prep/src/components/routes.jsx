import React from "react";
import Staticlayout from "./Staticlayout";
import Home from "./home";
import Login from "../components/login/Login";
import Dashboard from "../components/Dashboard";
import Blogcategory from "./blogs/Blogcategory";
import Blogcard from "./blogs/Blogcard";
import Contact from "./contactus/Contact";
import Course from "./course/Course";
import Preferred from "./course/Preferred";
import ContactUsPageSeo from "./Seo/ContactUsPageSeo";

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
  {
    path: "/blogcards",
    element: (
      <Staticlayout>
        <Blogcard />
      </Staticlayout>
    ),
  },
  {
    path: "/contactus",
    element: (
      <Staticlayout>
        <Contact />
      </Staticlayout>
    ),
  },
  {
    path: "/course",
    element: (
      <Staticlayout>
        <Course />
      </Staticlayout>
    ),
  },
  {
    path: "/preferred",
    element: (
      <Staticlayout>
        <Preferred />
      </Staticlayout>
    ),
  },
  {
    path: "/contactusseo",
    element: (
      <Staticlayout>
        <ContactUsPageSeo />
      </Staticlayout>
    ),
  },
];

export default routes;
