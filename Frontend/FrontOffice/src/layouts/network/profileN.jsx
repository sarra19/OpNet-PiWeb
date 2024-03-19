/* eslint-disable */
import { useEffect, useState } from "react";
import axios from "axios";

import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Header from "layouts/network/Header/index";
import { Link, useParams } from "react-router-dom";
import { Button } from "@mui/material";

function ProfileN() {
  const [userInfo, setUserInfo] = useState({});
  const { userId } = useParams();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/get/${userId}`);
        setUserInfo(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header>
        {userInfo && (
          <>
            <div style={containerStyle}>
              <div style={columnStyle}>
                <div style={sectionStyle}>
                  <h3 style={headingStyle}>Contact</h3>
                  <p><strong>Phone:</strong> <span style={textStyle}>{userInfo.phone}</span></p>
                  <p><strong>Email:</strong> <span style={textStyle}>{userInfo.email}</span></p>
                </div>
                <div style={sectionStyle}>
                  <h3 style={headingStyle}>Profile Information</h3>
                  <p><strong>Email:</strong> <span style={textStyle}>{userInfo.email}</span></p>
                  <p><strong>Date of Birth:</strong> <span style={textStyle}>{userInfo.dateOfBirth}</span></p>
                  <p><strong>Country:</strong> <span style={textStyle}>{userInfo.country}</span></p>
                  <p><strong>Phone:</strong> <span style={textStyle}>{userInfo.phone}</span></p>
                  <p><strong>Languages:</strong> <span style={textStyle}>{userInfo.languages}</span></p>
                </div>
              </div>
              <div style={columnStyle}>
                <div style={sectionStyle}>
                  <h3 style={headingStyle}>About Me</h3>
                  <p style={textStyle}>{userInfo.description}</p>
                </div>
                <div style={sectionStyle}>
                  <h3 style={headingStyle}>Experience</h3>
                  <p style={textStyle}>{userInfo.experience}</p>
                </div>
                <div style={sectionStyle}>
                  <h3 style={headingStyle}>Education</h3>
                  <p style={textStyle}>{userInfo.formation}</p>
                </div>
                <div style={sectionStyle}>
                  <h3 style={headingStyle}>Skills</h3>
                  <p style={textStyle}>{userInfo.skills}</p>
                </div>
                <div style={sectionStyle}>
                  <h3 style={headingStyle}>Certificates</h3>
                  <p style={textStyle}>{userInfo.certificates}</p>
                </div>
              </div>
            </div>
          </>
        )}
         <Link to="/Network">
          <Button variant="contained" color="error" size="small">
            Back
          </Button>
        </Link>
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

const containerStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "flex-start",
};

const columnStyle = {
  flex: "1",
  minWidth: "50%",
};

const sectionStyle = {
  marginBottom: "20px",
  padding: "20px",
  background: "#f9f9f9",
  borderRadius: "5px",
  margin: "10px"
};

const headingStyle = {
  marginBottom: "10px",
  color: "#333",
};

const textStyle = {
  color: "#555",
  fontSize: "16px"
};

export default ProfileN;
