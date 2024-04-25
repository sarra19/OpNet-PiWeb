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
import Condidacy from "layouts/Condidacy";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import ForgotPassword from "layouts/authentication/ForgotPassword";

// @mui icons
import Icon from "@mui/material/Icon";
import Interviews from "layouts/Interviews";
import Basic from "layouts/authentication/sign-in";
import PasswordReset from "layouts/authentication/PasswordReset";
import Network from "layouts/network";
import ProfileN from "layouts/network/profileN";
import ChatManagement from "layouts/Chat/Chat";
import ActivateProfile from "layouts/ActiverProfile";

const routes = [
  {
    route: "/forgot-password",
    component: <ForgotPassword />,
  },
  
  {
    route: "/password-reset/:id/:token",
    component: <PasswordReset />,
  },
  {
    route: "/ActivateProfile",
    component: <ActivateProfile />,
  },
  {
    type: "route",
    name: "Profile", // Nom de la route affiché dans le sidenav
    key: "user-profile", // Clé unique pour cette route
    route: "/user/:userId", // Make sure it matches the backend route
    component: <ProfileN />, // Composant UserDetailsPage à afficher lorsque cette route est visitée
  },
  {
    type: "collapse",
    name: "Home",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: `/dashboard`,
    component: <Dashboard />,
  },
  
  {
    type: "collapse",
    name: "Network",
    key: "Network",
    icon: <Icon fontSize="small">people</Icon>,
    route: "/Network",
    component: <Network />,
  },
  {
    type: "collapse",
    name: "Condidacy",
    key: "condidacy",
    icon: <Icon fontSize="small">work</Icon>,
    route: "/Condidacy",
    component: <Condidacy />,
  },
  {
    type: "collapse",
    name: "Chat",
    key: "Chat",
    icon: <Icon fontSize="small">chat</Icon>,
    route: "/Chat",
    component: <ChatManagement />,
  },
  {
    type: "collapse",
    name: "Interviews",
    key: "",
    icon: <Icon fontSize="small">assignment_ind</Icon>,
    route: "/Interviews",
    component: <Interviews />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
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