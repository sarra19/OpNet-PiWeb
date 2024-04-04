/*eslint-disable*/
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
import InterviewManagement from "layouts/interviewManagement";
import CondidacyManagement from "layouts/condidacyManagement";
import Question from "layouts/GetQuestions";
import AddQuestionForm from "layouts/AddQuestion";
import ModifierQuestionForm from "layouts/PutQuestion";
import QuizComponent from "layouts/Quiz";
import Ajouter from "layouts/ajouter";
import ModifyQuestion from "layouts/PutQuestion";
import ArchivedCandidatures from "layouts/ajouter";
import AcceptedCandidatures from "layouts/accept";

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
    type: "route",
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
    name: "Interview Management",
    key: "interview-Management",
    icon: <Icon fontSize="small">assignment_ind_outlined</Icon>,
    route: "/interviewManagement",
    component: <InterviewManagement />,
  },
  {
    type: "route",
    name: "modifier",
    key: "modif",
    icon: <Icon fontSize="small">work</Icon>,
    route: "/modifier/:id",
    component: <ModifyQuestion />,
  },
  {
    type: "route",
    name: "arch",
    key: "",
    icon: <Icon fontSize="small">work</Icon>,
    route: "/archives",
    component: <ArchivedCandidatures />,
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
    type: "collapse",
    name: "Candidacy Management",
    key: "condidacy-Management",
    icon: <Icon fontSize="small">person_outline</Icon>,
    route: "/condidacyManagement",
    component: <CondidacyManagement />,
  },
    {
    type: "collapse",
    name: "Question Management",
    key: "Question",
    icon: <Icon fontSize="small">people</Icon>,
    route: "/Question",
    component: <Question />,
  },
  {
    type: "route",
    name: "Compagny",
    key: "",
    icon: <Icon fontSize="small">business</Icon>,
    route: "/question/ajouter",
    component: <AddQuestionForm/>,
  },
  {
    type: "collapse",
    name: "Quiz Management",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/quiz",
    component: <QuizComponent />,
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
