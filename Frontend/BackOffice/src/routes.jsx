/*eslint-disable*/
import Dashboard from "layouts/dashboard";
//import Billing from "layouts/billing";
//import Notifications from "layouts/notifications";
import OfferManagement from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
//offer backoffise
import UpdateOffer from "layouts/profile/modifier";
import Ajouter from "layouts/profile/ajouter";
import Archive from "layouts/profile/archiver";
import OfferStatistics from "layouts/profile/statistic";

//import Offers from "layouts/offers/offer";

//import Candidacy from "layouts/candidacy";



/*esplin-disabled*/
// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
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
    name: "archive",
    key: "archive",
    route: "/archive",
    component: <Archive />,
  },
  {
    type: "route",
    name: "ajouter",
    key: "",
    route: "/offers/ajouter",
    component: <Ajouter />,
  },
  {
    type: "route",
    name: "modifier",
    key: "notifications",
    route: "/offers/modifier/:id",
    component: <UpdateOffer />,
  },
  {
    type: "collapse",
    name: "OfferManagement",
    key: "profile",
    icon: <Icon fontSize="small">work</Icon>,
    route: "/offerManagement",
    component: <OfferManagement />,
  }, {
    type: "collapse",
    name: "statictic",
    key: "",
    icon: <Icon fontSize="small">work</Icon>,
    route: "/offerStatictic",
    component: <OfferStatistics />,
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
