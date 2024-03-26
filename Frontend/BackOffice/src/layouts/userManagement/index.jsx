/* eslint-disable */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import { Autocomplete, Grid, TextField } from "@mui/material";

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
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search query
  const [sortBy, setSortBy] = useState(""); // State pour stocker le critère de tri
  const [sortOrder, setSortOrder] = useState(""); // State pour stocker l'ordre de tri

  // Fonction pour gérer le tri des utilisateurs
  const handleSort = async () => {
    try {
      const response = await axios.post("http://localhost:5000/user/sort", {
        sortBy,
        sortOrder,
      });

      setUsers(response.data);
    } catch (error) {
      console.error("Error sorting users:", error);
      setError("An error occurred while sorting users");
    }
  };
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
  

  const handleSearch = async () => {
    try {
      const response = await axios.post("http://localhost:5000/user/search", {
        firstname: searchQuery, // Search by firstname
        lastname: searchQuery, // Search by lastname
        speciality: searchQuery, // Search by speciality
        email: searchQuery, // Search by speciality
        institution: searchQuery, // Search by speciality


      });
  
      setUsers(response.data);
    } catch (error) {
      console.error("Error searching users:", error);
      setError("An error occurred while searching users");
    }
  };
  
  
  return (
    <DashboardLayout>
      <DashboardNavbar absolute isMini />
      <MDBox mt={8}>
        <MDBox mb={3}>
        <Grid container spacing={2} alignItems="center">
  {/* Champ de recherche */}
  <Grid item xs={12} sm={6} md={4}>
    <TextField
      label="Rechercher"
      variant="outlined"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      fullWidth
      size="small" // Réduction de la taille
    />
  </Grid>
  {/* Bouton de recherche */}
  <Grid item xs={12} sm={6} md={2}>
    <Button
      variant="contained"
      style={{ backgroundColor: '#E82227', color: 'white' }}
      onClick={handleSearch}
      fullWidth
    >
      Rechercher
    </Button>
  </Grid>
  {/* Menu déroulant pour trier */}
  <Grid item xs={12} sm={6} md={3}>
    <Autocomplete
      options={['firstname', 'lastname', 'speciality', 'institution']}
      value={sortBy}
      onChange={(event, newValue) => {
        setSortBy(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Trier par"
          variant="outlined"
          fullWidth
          size="small" // Réduction de la taille
        />
      )}
    />
  </Grid>
  {/* Menu déroulant pour l'ordre de tri */}
  <Grid item xs={12} sm={6} md={2}>
    <Autocomplete
      options={['asc', 'desc']}
      value={sortOrder}
      onChange={(event, newValue) => {
        setSortOrder(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Ordre"
          variant="outlined"
          fullWidth
          size="small" // Réduction de la taille
        />
      )}
    />
  </Grid>
  {/* Bouton de tri */}
  <Grid item xs={12} sm={6} md={1}>
    <Button
      variant="contained"
      style={{ backgroundColor: '#E82227', color: 'white' }}
      onClick={handleSort}
      fullWidth
    >
      Trier
    </Button>
  </Grid>
</Grid>

          <tr>
            <td colSpan="8" style={cellStyles}>
              <Button variant="contained" style={{ backgroundColor: '#E82227', color: '#fff' }}>
                <Link to="/AddUser" style={{ textDecoration: "none", color: "white" }}>Ajouter Utilisateur</Link>
              </Button>
            </td>
          </tr>
          {error && <div>Error: {error}</div>} {/* Display error message if error state is set */}
          <table style={tableStyles}>
            <thead>
              <tr>
                <th style={headerStyles}>Prénom</th>
                <th style={headerStyles}>Nom</th>
                <th style={headerStyles}>Email</th>
                <th style={headerStyles}>Role</th>
                <th style={headerStyles}>Pays</th>
                <th style={headerStyles}>Téléfone</th>
                <th style={headerStyles}>Specialité</th>
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
                      <Link to={`/user/${user._id}`} style={{ textDecoration: "none", color: "white" }}>Détails</Link>
                    </Button>
                    <Button size="small" variant="contained" style={{ backgroundColor: '#E82227', color: '#fff', cursor: "pointer" ,marginRight: "5px" }}
  onClick={() => handleDeleteUser(user._id)}>Suprimer</Button>

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
