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
//commit 
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import ResetPassword from "layouts/authentication/reset-password";

// @mui icons
import Icon from "@mui/material/Icon";

import Statistics from "layouts/statistics";

import UserManagement from "layouts/userManagement";

import UserDetails from "layouts/userManagement/UserDetails";
import Ajout from "layouts/userManagement/ajout";

import Calendrier from "layouts/interviewManagement/calendrier";
import FeedBackManagement from "layouts/feedbackManagement";
import FeedBack from "layouts/feedbackManagement/feedback_ai";
import FormEmail from "layouts/interviewManagement/mail";
import CondidacyManagement from "layouts/condidacyManagement";
import Question from "layouts/GetQuestions";
import AddQuestionForm from "layouts/AddQuestion";
import ModifierQuestionForm from "layouts/PutQuestion";
import QuizComponent from "layouts/Quiz";
import ModifyQuestion from "layouts/PutQuestion";
import ArchivedCandidatures from "layouts/ajouter";
import UpdateOffer from "layouts/profile/modifier";
import Ajouter from "layouts/profile/ajouter";
import Archive from "layouts/profile/archiver";
import OfferManagement from "layouts/profile";
import AcceptedCandidatures from "layouts/accept";


import Meet from "layouts/interviewManagement/meet";
import ContactForm from "layouts/Email/ContactForm";
import StatisticsComponent from "layouts/statistics";
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
const userRole = getCookie("userRole");

const routes = [
  {
    route: "/authentication/rest-password",
    component: <ResetPassword />,
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
    type: "route",
    name: "email",
    key: "",
    icon: <Icon fontSize="small">work</Icon>,
    route: "/email",
    component: <ContactForm />,
  },
  {

    type: "route",
    name: "Détails de l'utilisateur",
    key: "details-utilisateur",
    route: "/user/:userId", // Make sure it matches the backend route
    component: <UserDetails />, // Composant UserDetailsPage à afficher lorsque cette route est visitée
  },
  {
    type: "route",
    name: "Ajouter un utilisateur",
  key: "ajouter-utilisateur",
    route:  "/AddUser",
    component: <Ajout />, // Composant UserDetailsPage à afficher lorsque cette route est visitée
  },
   
  {

    type: "collapse",
    name: "Accueil",
    key: "Accueil",
    icon: <Icon fontSize="small">home</Icon>,

    route: `/dashboard`,
    component: <Dashboard />,

  },
 
  {
    type: "collapse",

    name: "Statistiques",
    key: "statistiques",
    icon: <Icon fontSize="small">bar_chart</Icon>,
    route: "/statistics",
    component: userRole === "Admin" || userRole === "subadmin" ? <StatisticsComponent /> : null,

  },
  {
    type: "collapse",
    name: "Gestion des utilisateurs",
  key: "gestion-utilisateurs",
  icon: <Icon fontSize="small">people</Icon>,
  route: "/userManagement",
  component: userRole === "Admin" || userRole === "subadmin" ? <UserManagement /> : null,

},

 
  {
    type: "route",
    name: "Gestion des entretiens",
  key: "gestion-entretiens",
  icon: <Icon fontSize="small">calendar_today</Icon>,
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
    name: "Gestion des évaluations",
  key: "gestion-évaluations",
  icon: <Icon fontSize="small">feedback</Icon>,
  route: "/feedback",
    component: <FeedBackManagement />,

  },
  {
    type: "route",
    name: "Enregistreur vocal",
  key: "enregistreur-vocal", 
    route: "/enregistreur_vocale", 
    component: <FeedBack />, 
  },

  // {
  //   type: "route",
  //   name: "Gestion des évaluations",
  // key: "gestion-évaluations",
  //   route: "/feedback_Management", 
  //   component: <FeedBackManagement />, 
  // },


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
  
{ type: "route",
    name: "calendrier", 
    key: "calendrier", 
    route: "/calendrier", 
    component: <Calendrier />, 
  },
  {
    type: "route",
    name: "Gestion des candidatures",
    key: "gestion-candidatures",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/condidacyManagement/:offreId",
    component: <CondidacyManagement />,

  },
  {
    type: "route",
    name: "acc",
    key: "",
    icon: <Icon fontSize="small">work</Icon>,
    route: "/accept",
    component: <AcceptedCandidatures />,
  },
 
  {
    type: "route",
    name: "modifier",
    key: "modif",
    icon: <Icon fontSize="small">edit</Icon>,
    route: "/modifier/:id",
    component: <ModifyQuestion />,
  },
  {
    type: "route",
    name: "arch",
    key: "arch",
    icon: <Icon fontSize="small">archive</Icon>,
    route: "/archives",
    component: <ArchivedCandidatures />,
  },
 
   
    {
    type: "collapse",
    name: "Gestion des questions",
    key: "gestion-questions",
    icon: <Icon fontSize="small">question_answer</Icon>,
    route: "/Question",
    component: <Question />,
  },
  {
    type: "route",
    name: "Entreprise",
  key: "entreprise",
  icon: <Icon fontSize="small">add</Icon>,
  route: "/question/ajouter",
    component: <AddQuestionForm/>,
  },
  {
    type: "route",
    name: "Gestion des quiz",
    key: "gestion-quiz",
    icon: <Icon fontSize="small">quiz</Icon>,
    route: "/quiz",
    component: <QuizComponent />,
  },
  {
    type: "collapse",
    name: "Gestion des offres",
    key: "gestion-offres",
    icon: <Icon fontSize="small">work</Icon>,
    route: "/offerManagement",
    component: <OfferManagement />,
  },
  {
    type: "collapse",
    name: "Connexion",
  key: "connexion",
    icon: <Icon fontSize="small">login</Icon>,

    route: "http://localhost:3000/authentication/sign-in",

    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Inscription",
  key: "inscription",
    icon: <Icon fontSize="small">assignment</Icon>,

    route: "http://localhost:3000/authentication/sign-up",

    component: <SignUp />,
  },
  {
    type: "route",
    name: "archive",
    key: "archive",
    route: "/archive",
    component: <Archive />,
  },
  {
    type: "route",
    name: "Ajouter",
    key: "ajouter",
    route: "/offers/ajouter",
    component: <Ajouter />,
  },
  {
    type: "route",
    name: "Modifier",
    key: "modifier-notifications",
    route: "/offers/modifier/:id",
    component: <UpdateOffer />,
  },
 
  
];

export default routes;