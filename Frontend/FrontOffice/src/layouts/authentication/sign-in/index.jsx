/* eslint-disable */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";

import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import { AiFillGoogleCircle } from "react-icons/ai";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import bgImage from "assets/images/bg-sign-in-basic.jpg";
import { useNavigate } from "react-router-dom";
import API_URLS from "../../../apiUrls";
import { Button } from "@mui/material";

function Basic() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/auth";
      const formData = { email, password }; // Constructing the data object
      const { data: res } = await axios.post(url, formData); // Sending the formData as the second argument
  
      localStorage.setItem("token", res.data);
  
      const response = await axios.post(API_URLS.login, {
        email: email,
        password: password
      });
  
      if (response.data.redirectUrl && response.data.userId && response.data.userRole) {
        const userId = response.data.userId;
        const userRole = response.data.userRole;
  
        sessionStorage.setItem("userId", userId);
        sessionStorage.setItem("userRole", userRole);
  
        navigate(response.data.redirectUrl);
      } else {
        console.error("La connexion a échoué.");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
    }
  };
  

  let [searchParams] = useSearchParams();
  const [user, setUser] = useState({});
  const emailParam = searchParams.get("email");
  const firstname = searchParams.get("firstname");
  const secret = searchParams.get("secret");

  useEffect(() => {
    if (emailParam && firstname && secret) {
      sessionStorage.setItem(
        "user",
        JSON.stringify({
          email: emailParam,
          firstname,
          secret,
        })
      );
    }
  }, []);

  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem("user")));
  }, []);

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" action="http://localhost:5000/auth/google">
            <MDBox mb={2}>
              <MDTypography variant="body1" mb={1}>Email address</MDTypography>
              <MDInput type="email" fullWidth onChange={handleEmailChange} value={email} />
            </MDBox>
            <MDBox mb={2}>
              <MDTypography variant="body1" mb={1}>Password</MDTypography>
              <MDInput type="password" fullWidth onChange={handlePasswordChange} value={password} />
            </MDBox>
            <MDBox display="flex" alignItems="center" mb={2}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="body2"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: 1 }}
              >
                Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={handleSignIn}>
                Sign in
              </MDButton>
            </MDBox>
            <MDBox mb={2} textAlign="center">
              <MDTypography variant="body2" color="text">
                Don't have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/dashboard"
                  variant="body2"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
            <Link to="/forgot-password" style={{ alignSelf: "flex-start" }}>
							<p style={{ padding: "0 15px" }}>Forgot Password ?</p>
						</Link>
            <MDBox textAlign="center">
              <Button
                leftIcon={<AiFillGoogleCircle />}
                colorScheme="red"
                variant="solid"
                w={"100%"}
                type="submit"
              >
                Connect with Google
              </Button>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
