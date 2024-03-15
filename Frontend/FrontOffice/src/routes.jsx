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

// Material Dashboard 2 React layouts
/*eslint-disable*/
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Chat from "layouts/Chat";
import Candidacy from "layouts/Candidacy";
import Question from "layouts/GetQuestions";

import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import ResetPassword from "layouts/authentication/reset-password";


// @mui icons
import Icon from "@mui/material/Icon";
import AddQuestionForm from "layouts/AddQuestion";
import ModifierQuestionForm from "layouts/PutQuestion";
import Home from "layouts/Home";

const routes = [
  {
    route: "/authentication/rest-password",
    component: <ResetPassword />,
  },
  {
    type: "route",
    name: "question", // Nom de la route affiché dans le sidenav
    key: "questions", // Clé unique pour cette route
    route: "/question/ajouter", // Chemin vers la page des détails de l'utilisateur avec un paramètre pour l'ID de l'utilisateur
    component: <AddQuestionForm />, // Composant UserDetailsPage à afficher lorsque cette route est visitée
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
    name: "Network",
    key: "tables",
    icon: <Icon fontSize="small">people</Icon>,
    route: "/tables",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "Candidacy",
    key: "Candidacy",
    icon: <Icon fontSize="small">work</Icon>,
    route: "/candidature/ajouter",
    component: <Candidacy />,
  },
  {
    type: "collapse",
    name: "Question",
    key: "Question",
    icon: <Icon fontSize="small">people</Icon>,
    route: "/Question",
    component: <Question />,
  },
  {
    type: "collapse",
    name: "Compagny",
    key: "",
    icon: <Icon fontSize="small">business</Icon>,
    route: "/quiz/home",
    component: <Home/>,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/question/modifier/${question._id}",
    component: <ModifierQuestionForm />,
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
