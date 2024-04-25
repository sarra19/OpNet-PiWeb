/* eslint-disable */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useLocation, NavLink } from "react-router-dom";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import SidenavCollapse from "examples/Sidenav/SidenavCollapse";
import SidenavRoot from "examples/Sidenav/SidenavRoot";
import sidenavLogoLabel from "examples/Sidenav/styles/sidenav";
import { useMaterialUIController, setMiniSidenav, setTransparentSidenav, setWhiteSidenav } from "context";
import axios from "axios";
import API_URLS from "apiUrls";

function Sidenav({ color, brand, brandName, routes, ...rest }) {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode } = controller;
  const location = useLocation();
  const collapseName = location.pathname.replace("/", "");
  const [avatarImage, setAvatarImage] = useState(null);
  const [userInfo, setUserInfo] = useState({});

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  
  
   
  useEffect(() => {
      // Récupérer userId et userRole depuis les cookies
    async function fetchUserData() {
      try {
        const userId = getCookie("userId");

        if (!userId) {
          console.error("User ID not found in sessionStorage");
          return;
        }
        const response = await axios.get(API_URLS.getUserById(userId));
        setUserInfo(response.data);
        
        if (response.data.profileImage) {
          setAvatarImage(response.data.profileImage);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, []);

  const closeSidenav = () => setMiniSidenav(dispatch, true);

  const renderRoutes = routes.map(({ type, name, icon, title, noCollapse, key, href, route }) => {
    let returnValue;

    if (type === "collapse") {
      returnValue = href ? (
        <Link href={href} key={key} target="_blank" rel="noreferrer" sx={{ textDecoration: "none" }}>
          <SidenavCollapse name={name} icon={icon} active={key === collapseName} noCollapse={noCollapse} />
        </Link>
      ) : (
        <NavLink key={key} to={route}>
          <SidenavCollapse name={name} icon={icon} active={key === collapseName} />
        </NavLink>
      );
    } else if (type === "title") {
      returnValue = (
        <MDTypography
          key={key}
          color="white"
          display="block"
          variant="caption"
          fontWeight="bold"
          textTransform="uppercase"
          pl={3}
          mt={2}
          mb={1}
          ml={1}
        >
          {title}
        </MDTypography>
      );
    } else if (type === "divider") {
      returnValue = (
        <Divider
          key={key}
          light={
            (!darkMode && !whiteSidenav && !transparentSidenav) ||
            (darkMode && !transparentSidenav && whiteSidenav)
          }
        />
      );
    }

    return returnValue;
  });

  return (
    <SidenavRoot {...rest} variant="permanent" ownerState={{ transparentSidenav, whiteSidenav, miniSidenav, darkMode }}>
      <MDBox pt={3} pb={1} px={4} textAlign="center">
        <MDBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <MDTypography variant="h6" color="secondary">
            <Icon sx={{ fontWeight: "bold" }}>close</Icon>
          </MDTypography>
        </MDBox>
        <MDBox component={NavLink} to="/" display="flex" alignItems="center">
          {brand && <MDBox component="img" src={brand} alt="Brand" width="2rem" />}
          <MDBox
            width={!brandName && "100%"}
            sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}
          >
            <MDTypography component="h6" variant="button" fontWeight="medium" color="white">
              {brandName}
            </MDTypography>
          </MDBox>
        </MDBox>
        {/* Display the avatar image and user info if available */}
        {avatarImage && (
          <MDBox mt={2} mb={2} sx={{ border: "2px solid red", borderRadius: "8px", padding: "8px" }}>
            <img
              src={avatarImage}
              alt="Avatar"
              style={{ width: "50px", height: "50px", borderRadius: "50%", marginBottom: "10px" }}
            />
            <MDTypography variant="body2" color="white">
              {userInfo.firstname} {userInfo.lastname}
            </MDTypography>
          </MDBox>
        )}
      </MDBox>
      <Divider
        light={
          (!darkMode && !whiteSidenav && !transparentSidenav) ||
          (darkMode && !transparentSidenav && whiteSidenav)
        }
      />
      <List>{renderRoutes}</List>
    </SidenavRoot>
  );
}

Sidenav.defaultProps = {
  color: "info",
  brand: "",
};

Sidenav.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
