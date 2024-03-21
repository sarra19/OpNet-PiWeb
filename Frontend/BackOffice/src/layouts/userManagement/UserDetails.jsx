/* eslint-disable */
import { useEffect, useState } from "react";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Header from "./components/Header";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import MDBox from "components/MDBox";
import { Link, useParams } from "react-router-dom"; // Import useParams from React Router
import MDButton from "components/MDButton";

function UserDetails() {
  const [userInfo, setUserInfo] = useState({});

  const [openContactDialog, setOpenContactDialog] = useState(false);
  const [openProfileDialog, setOpenProfileDialog] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const { userId } = useParams(); // Extract userId from the URL using useParams

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    dateOfBirth: "",
    country: "",
    phone: "",
    languages: "",
    description: "",
    experience: "",
    formation: "",
    skills: "",
    certificates: ""
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/get/${userId}`);
        setUserInfo(response.data);
        // Pre-fill form data with user details
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);


  const handleOpenContactDialog = () => {
    setOpenContactDialog(true);
    setEditingSection("contact");
    // Pré-remplir les champs de la boîte de dialogue avec les données de contact
    setFormData({
      ...formData,
      phone: userInfo.phone,
      email: userInfo.email
    });
  };

  const handleOpenProfileDialog = () => {
    setOpenProfileDialog(true);
    setEditingSection("profile");
    // Pré-remplir les champs de la boîte de dialogue avec les données de profil
    setFormData({
      ...formData,
      dateOfBirth: userInfo.dateOfBirth,
      country: userInfo.country,
      languages: userInfo.languages
    });
  };

  const handleCloseDialog = () => {
    setOpenContactDialog(false);
    setOpenProfileDialog(false);
    setEditingSection(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleUpdateUser = async () => {
    try {
      // Envoyer les données modifiées au backend
      const response = await axios.put(`http://localhost:5000/user/updateUser/${userId}`, formData);
      console.log(response.data);
      setOpenContactDialog(false);
      setOpenProfileDialog(false);
      // Facultatif : mettre à jour les infos utilisateur affichées sans faire une autre requête
      setUserInfo(formData);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
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
                  <h3 style={headingStyle}>
                    Contact
                    <EditIcon style={editIconStyle}  onClick={handleOpenContactDialog} />
                  </h3>
                  <div style={contactContainer}>
                    <p><strong>Phone:</strong> <span style={textStyle}>{userInfo.phone}</span></p>
                  </div>
                  <div style={contactContainer}>
                    <p><strong>Email:</strong> <span style={textStyle}>{userInfo.email}</span></p>
                  </div>
                </div>
                <div style={sectionStyle}>
                  <h3 style={headingStyle}>Profile Information
                  <EditIcon style={editIconStyle}  onClick={handleOpenProfileDialog} />
                  </h3>
                  <div style={contactContainer}>
                    <p><strong>Date of Birth:</strong> <span style={textStyle}>{userInfo.dateOfBirth}</span></p>
                  </div>
                  <div style={contactContainer}>
                    <p><strong>Country:</strong> <span style={textStyle}>{userInfo.country}</span></p>
                  </div>
                  <div style={contactContainer}>
                    <p><strong>Languages:</strong> <span style={textStyle}>{userInfo.languages}</span></p>
                  </div>
                </div>
              </div>
              <div style={columnStyle}>
                <div style={sectionStyle}>
                  <h3 style={headingStyle}>About Me
                    <EditIcon style={editIconStyle} onClick={() => handleOpenDialog("description")} />
                  </h3>
                  <div style={contactContainer}>
                    <p style={textStyle}>{userInfo.description}</p>
                  </div>
                </div>
                <div style={sectionStyle}>
                  <h3 style={headingStyle}>Experience
                    <EditIcon  style={editIconStyle} onClick={() => handleOpenDialog("experience")} />
                  </h3>
                  <div style={contactContainer}>

                    <p style={textStyle}>{userInfo.experience}</p>

                  </div>
                </div>

                <div style={sectionStyle}>
                  <h3 style={headingStyle}>Education
                    <EditIcon style={editIconStyle} onClick={() => handleOpenDialog("formation")} />
                  </h3>
                  <div style={contactContainer}>
                    <p style={textStyle}>{userInfo.formation}</p>
                  </div>

                </div>
                <div style={sectionStyle}>
                  <h3 style={headingStyle}>Skills
                    <EditIcon  style={editIconStyle} onClick={() => handleOpenDialog("skills")} />
                  </h3>
                  <div style={contactContainer}>
                    <p style={textStyle}>{userInfo.skills}</p>

                  </div>
                </div>

                <div style={sectionStyle}>
                  <h3 style={headingStyle}>Certificates
                    <EditIcon style={editIconStyle} onClick={() => handleOpenDialog("certificates")} />
                  </h3>
                  <div style={contactContainer}>

                    <p style={textStyle}>{userInfo.certificates}</p>
                  </div>

                </div>
              </div>
            </div>
            {/* Dialogue pour modifier les informations de contact */}
            <Dialog open={openContactDialog} onClose={handleCloseDialog}>
              <DialogTitle>Modify Contact Information</DialogTitle>
              <DialogContent>
                <TextField
                  name="phone"
                  label="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  name="email"
                  label="Email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>Cancel</Button>
                <Button onClick={handleUpdateUser} color="primary">Save</Button>
              </DialogActions>
            </Dialog>

            {/* Dialogue pour modifier les informations de profil */}
            <Dialog open={openProfileDialog} onClose={handleCloseDialog}>
              <DialogTitle>Modify Profile Information</DialogTitle>
              <DialogContent>
                <TextField
                  name="dateOfBirth"
                  label="Date of Birth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  name="country"
                  label="Country"
                  value={formData.country}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  name="languages"
                  label="Languages"
                  value={formData.languages}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>Cancel</Button>
                <Button onClick={handleUpdateUser} color="primary">Save</Button>
              </DialogActions>
            </Dialog>
            <Link to="/userManagement">
          <MDButton variant="contained" color="error" size="small">
            Back
          </MDButton>
        </Link>
          </>
        )}
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
const editIconStyle = {
  marginRight: "10px",
  color: '#E82227',
};
const contactContainer = {
  display: "flex",
  alignItems: "center"
};

export default UserDetails;
