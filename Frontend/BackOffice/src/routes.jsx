/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/
/* eslint-disable */
// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";

import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import ResetPassword from "layouts/authentication/reset-password";

// @mui icons
import Icon from "@mui/material/Icon";

import Statistics from "layouts/statistics";
import UserManagement from "layouts/userManagement";
import ChatManagement from "layouts/chatManagement";
import OfferManagement from "layouts/offerManagement";
import CondidacyManagement from "layouts/condidacyManagement";
import Calendrier from "layouts/interviewManagement/calendrier";
import FeedBackManagement from "layouts/feedbackManagement";
import FeedBack from "layouts/feedbackManagement/feedback_ai";
import Meet from "layouts/interviewManagement/meet";
import FormEmail from "layouts/interviewManagement/mail";

const routes = [
  {
    route: "/authentication/rest-password",
    component: <ResetPassword />,
  },
  {
    type: "collapse",
    name: "Home",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Statistics",
    key: "Statistics",
    icon: <Icon fontSize="small">bar_chart</Icon>,
    route: "/statistics",
    component: <Statistics />,

  },
  {
    type: "collapse",
    name: "User Management",
    key: "User-Management",
    icon: <Icon fontSize="small">work_outline</Icon>,
    route: "/userManagement",
    component: <UserManagement />,
  },
  {
    type: "collapse",
    name: "Chat Management",
    key: "Chat-Management",
    icon: <Icon fontSize="small">chat_bubble_outline</Icon>,
    route: "/chaManagementt",
    component: <ChatManagement />,
  },
  {
    type: "collapse",
    name: "Offer Management",
    key: "Offer-Management",
    icon: <Icon fontSize="small">people_outline</Icon>,
    route: "/offerManagement",
    component: <OfferManagement />,
  },
  {
    type: "collapse",
    name: "Interview Management",
    key: "interview-Management",
    icon: <Icon fontSize="small">assignment_ind_outlined</Icon>,
    route: "/calendrier",
    component: <Calendrier />,

  },
  // {
  //   type: "route",
  //   name: "calendrier", 
  //   key: "calendrier", 
  //   route: "/calendrier", 
  //   component: <Calendrier />, 
  // },
  {
    type: "collapse",
    name: "Feedback Management",
    key: "Feedback_Management",
    icon: <Icon fontSize="small">assignment_ind_outlined</Icon>,
    route: "/feedback",
    component: <FeedBackManagement />,

  },
  {
    type: "route",
    name: "enregistreur_vocale", 
    key: "enregistreur_vocale", 
    route: "/enregistreur_vocale", 
    component: <FeedBack />, 
  },
  {
    type: "route",
    name: "feedback_Management", 
    key: "feedback_Management", 
    route: "/feedback_Management", 
    component: <FeedBackManagement />, 
  },
  {
    type: "route",
    name: "meet", 
    key: "meet", 
    route: "/meet", 
    component: <Meet />, 
  },
  {
    type: "route",
    name: "calendrier", 
    key: "calendrier", 
    route: "/calendrier", 
    component: <Calendrier />, 
  },
  {
    type: "route",
    name: "email",
    key: "",
    icon: <Icon fontSize="small">work</Icon>,
    route: "/email_interview",
    component: <FormEmail />,
  },
  {
    type: "collapse",
    name: "Condidacy Management",
    key: "condidacy-Management",
    icon: <Icon fontSize="small">person_outline</Icon>,
    route: "/condidacyManagement",
    component: <CondidacyManagement />,

  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
];

export default routes;