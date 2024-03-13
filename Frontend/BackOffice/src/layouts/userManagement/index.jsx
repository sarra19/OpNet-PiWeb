/* eslint-disable */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";

// CSS Styles
const tableStyles = {
  width: "100%",
  borderCollapse: "collapse",
};

const cellStyles = {
  padding: "8px",
  textAlign: "center", // Center align cell content
  borderBottom: "1px solid #ddd",
  fontSize: "12px", // Adjust font size here
};

const evenRowStyles = {
  backgroundColor: "#f2f2f2",
};

const headerStyles = {
  ...cellStyles,
  color: "red", // Add red color to column headers
  textAlign: "center", // Center align column headers
};

const buttonContainerStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center", // Center align button container
  marginBottom: "10px",
};

const buttonStyles = {
  cursor: "pointer",
  marginRight: "5px",
};

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user/getall");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Error fetching users. Please try again later."); // Set error state
      }
    };

    fetchUsers();
  }, []);
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/user/deleteUser/${userId}`);
      // Filter out the deleted user from the users array
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  
  return (
    <DashboardLayout>
      <DashboardNavbar absolute isMini />
      <MDBox mt={8}>
        <MDBox mb={3}>
          <tr>
            <td colSpan="8" style={cellStyles}>
              <Button variant="contained" color="secondary">
                <Link to="/AddUser" style={{ textDecoration: "none", color: "white" }}>Ajouter Utilisateur</Link>
              </Button>
            </td>
          </tr>
          {error && <div>Error: {error}</div>} {/* Display error message if error state is set */}
          <table style={tableStyles}>
            <thead>
              <tr>
                <th style={headerStyles}>First Name</th>
                <th style={headerStyles}>Last Name</th>
                <th style={headerStyles}>Email</th>
                <th style={headerStyles}>Role</th>
                <th style={headerStyles}>City</th>
                <th style={headerStyles}>Phone</th>
                <th style={headerStyles}>Speciality</th>
                <th style={headerStyles}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} style={index % 2 === 0 ? evenRowStyles : {}}>
                  <td style={cellStyles}>{user.firstname}</td>
                  <td style={cellStyles}>{user.lastname}</td>
                  <td style={cellStyles}>{user.email}</td>
                  <td style={cellStyles}>{user.role}</td>
                  <td style={cellStyles}>{user.city}</td>
                  <td style={cellStyles}>{user.phone}</td>
                  <td style={cellStyles}>{user.speciality}</td>
                  <td style={{ ...cellStyles, ...buttonContainerStyles }}>
                    <Button size="small" variant="contained" color="primary" style={buttonStyles}>
                      <Link to={`/user/${user._id}`} style={{ textDecoration: "none", color: "white" }}>Details</Link>
                    </Button>
                    <Button size="small" variant="contained" color="secondary" style={buttonStyles} onClick={() => handleDeleteUser(user._id)}>Delete</Button>
                    <Button size="small" variant="contained" color="default" style={buttonStyles}>
                    <Link to={`/update/${user._id}`} >Modify </Link>

                      </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default UserManagement;
