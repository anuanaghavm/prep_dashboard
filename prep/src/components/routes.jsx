import React from "react";
import Staticlayout from "./Staticlayout";
import Home from "./home";
import Login from "../components/login/Login";
import Dashboard from "../components/Dashboard";
import Blogcategory from "./blogs/Blogcategory";
import Blogcard from "./blogs/Blogcard";
import Contact from "./contactus/Contact";
import Course from "./course/Course";
import ContactUsPageSeo from "./Seo/ContactUsPageSeo";
import CoursesTagSeo from "./Seo/CoursesTagSeo";
import MetaTagsBlogForm from "./Seo/MetaTagsBlogForm";
import MetaTagsAboutUs from "./Seo/MetaTagsAboutUs";
import MetaTagsHome from "./Seo/MetaTagsHome";
import QuestionForm from "./question/QuestionForm";
import Responses from "./responses/Responses";
import ResponseForm from "./responses/ResponseForm";
import UserList from "./users/UserList";
import CourseList from "./courses/CourseList";
import SubjectList from "./courses/SubjectList";
import SectionList from "./courses/SectionList";
import UserFormList from "./courses/UserFormList";
import PaymentList from "./payments/PaymentList";
import PaymentHistory from "./payments/PaymentHistory";
import PaymentSettings from "./payments/PaymentSettings";
import RemoveCoursePayment from "./payments/RemoveCoursePayment";

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
    path: "/MetaTagsBlogForm",
    element: (
      <Staticlayout>
        <MetaTagsBlogForm />
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
  {
    path: "/aboutusseo",
    element: (
      <Staticlayout>
        <MetaTagsAboutUs />
      </Staticlayout>
    ),
  },
  {
    path: "/CoursesTagSeo",
    element: (
      <Staticlayout>
        <CoursesTagSeo />
      </Staticlayout>
    ),
  },
  {
    path: "/homeseo",
    element: (
      <Staticlayout>
        <MetaTagsHome />
      </Staticlayout>
    ),
  },
  {
    path: "/question",
    element: (
      <Staticlayout>
        <QuestionForm />
      </Staticlayout>
    )
  },
  {
    path: "/response",
    element: (
      <Staticlayout>
        <Responses />
      </Staticlayout>
    )
  },
  {
    path: "/submit-response",
    element: (
      <Staticlayout>
        <ResponseForm />
      </Staticlayout>
    )
  },
  {
    path: "/users",
    element: (
      <Staticlayout>
        <UserList />
      </Staticlayout>
    ),
  },
  {
    path: "/courses",
    element: (
      <Staticlayout>
        <CourseList />
      </Staticlayout>
    ),
  },
  {
    path: "/subjects",
    element: (
      <Staticlayout>
        <SubjectList />
      </Staticlayout>
    ),
  },
  {
    path: "/sections",
    element: (
      <Staticlayout>
        <SectionList />
      </Staticlayout>
    )
  },
  {
    path: "/user-forms",
    element: (
      <Staticlayout>
        <UserFormList />
      </Staticlayout>
    )
  },
  {
    path: "/payments",
    element: (
      <Staticlayout>
        <PaymentList />
      </Staticlayout>
    ),
  },
  {
    path: "/payment-history",
    element: (
      <Staticlayout>
        <PaymentHistory />
      </Staticlayout>
    ),
  },
  {
    path: "/payment-settings",
    element: (
      <Staticlayout>
        <PaymentSettings />
      </Staticlayout>
    ),
  },
  {
    path: "/remove-course-payment",
    element: (
      <Staticlayout>
        <RemoveCoursePayment />
      </Staticlayout>
    ),
  },
];

export default routes;
