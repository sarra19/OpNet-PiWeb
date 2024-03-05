/* eslint-disable */
import React, { useState, useEffect } from "react";
import axios from "axios";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function Overview() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Retrieve the user ID from localStorage
        const userId = localStorage.getItem("userId");
        
        // Make a request to fetch the user profile data using the stored user ID
        const response = await axios.get(`http://localhost:5000/user/profile/${userId}`);
        
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      {user && (
        <MDBox>
          <div>
            <h2>User Details</h2>
            <p>Name: {user.firstname} {user.lastname}</p>
            <p>Email: {user.email}</p>
            {/* Add other user details here */}
          </div>
        </MDBox>
      )}
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;

