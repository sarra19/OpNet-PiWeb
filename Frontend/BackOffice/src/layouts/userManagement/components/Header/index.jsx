/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import breakpoints from "assets/theme/base/breakpoints";
import backgroundImage from "assets/images/bg-pofile.jpg";
import EditIcon from "@mui/icons-material/Edit";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Autocomplete } from "@mui/material";
import { useParams } from "react-router-dom";
import { PDFDocument ,rgb} from "pdf-lib";

function Header({ children }) {
  const { userId } = useParams();
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const [userInfo, setUserInfo] = useState({});
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    institution: "", 
    speciality: "",
    firstnameError: "",
    lastnameError: "",
  });
  const institutionOptions = [
    "Université de Paris",
    "Université de Montréal",
    "Université de New York",
    "Université de Tokyo",
    "Institut de technologie du Massachusetts (MIT)",
    "Université de Stanford",
    "Université de Cambridge",
    "Université de Harvard",
    "Université de Pékin",
    "Université nationale autonome du Mexique (UNAM)",
    "Université de Sydney",
    "Université de Cape Town",
    "Université de Buenos Aires",
    "Université de Sao Paulo",
    "Université de Moscou",
    "Université de Delhi",
    "Université de Kyoto",
    "Université de Toronto",
    "Université de Zurich",
    "Université de Melbourne",
  ];
  
  const [avatarImage, setAvatarImage] = useState(null);
  const [isValid, setIsValid] = useState(true); // State variable for form validation
  const inputRef = useRef(null);
  const [selectedInst, setSelectedInst] = useState([]);
  const [InstOptions, setInstOptions] = useState([...institutionOptions]);

  const handleAddInst = () => {
    // Open a dialog or prompt for users to enter the new education option
    const newInstOption = prompt("Enter the new institution option:");
    if (newInstOption) {
      // Add the new education option to the existing options
      const updatedInstOptions = [...institutionOptions, newInstOption];
      setInstOptions(updatedInstOptions);
  
      // Select the newly added education option
      setSelectedInst([...selectedInst, newInstOption]);
    }}

  useEffect(() => {
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    window.addEventListener("resize", handleTabsOrientation);
    handleTabsOrientation();

    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  useEffect(() => {
    async function fetchUserData() {
      try {
        if (!userId) {
          console.error("User ID not found in URL parameters");
          return;
        }
        const response = await axios.get(`http://localhost:5000/user/get/${userId}`);
        setUserInfo(response.data);
        setFormData({
          profileImage: response.data.profileImage,
          cV: response.data.cV,

          firstname: response.data.firstname,
          lastname: response.data.lastname,
          speciality: response.data.speciality,
          institution: response.data.institution,
        });
        if (response.data.profileImage) {
          setAvatarImage(response.data.profileImage);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, [userId]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  const handleEditDialogOpen = () => {
    setOpenEditDialog(true);
  };

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
  };

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = "";
    let isValid = true; // Initially assume input is valid
    if (name === "firstname" || name === "lastname") {
      if (/\d/.test(value)) {
        errorMessage = "Name should not contain numbers";
        isValid = false; // Set isValid to false if validation fails
      } else if (value.length <= 3) {
        errorMessage = "Name should be more than 3 characters";
        isValid = false; // Set isValid to false if validation fails
      }
    } 
    setFormData({
      ...formData,
      [name]: value,
      [`${name}Error`]: errorMessage,
    });
    setIsValid(isValid); // Update isValid state
  };

  const handleUpdateUserInfo = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/user/updateUser/${userId}`, formData);
      console.log(response.data);
      setUserInfo(formData);
      handleEditDialogClose();
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  };

  const handleAvatarClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("avatar", file);
      formData.append("userId", userId);
      axios.put("http://localhost:5000/user/uploadAvatar", formData)
        .then(response => {
          console.log(response.data);
          setAvatarImage(URL.createObjectURL(file));
        })
        .catch(error => {
          console.error("Error uploading avatar:", error);
        });
    }
  };
  const handleDownloadPDF = async () => {
    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([400, 400]);
  
      const redColor = rgb(232/255, 34/255, 39/255); // Créez un objet Color avec la couleur spécifiée
  
      page.drawText(`Informations de l'utilisateur:
        Prénom: ${formData.firstname}
        Nom: ${formData.lastname}
        Spécialité: ${formData.speciality}
        Institution: ${formData.institution}
         cV: ${formData.cV}`, {
        x: 50,
        y: 350,
        size: 12,
        color: redColor, // Utilisez l'objet Color
      });
  
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "informations_utilisateur.pdf";
      link.click();
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };
  
  return (
    <MDBox position="relative" mb={5}>
      <MDBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <input
              type="file"
              ref={inputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
                       <MDAvatar
              src={avatarImage}
              alt={`${userInfo.firstname} ${userInfo.lastname}`}
              sx={{ width: 120, height: 120 }}
              onClick={handleAvatarClick}
            />
          </Grid>

          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
                {userInfo.firstname} {userInfo.lastname}
                <EditIcon color="primary" onClick={handleEditDialogOpen} />
              </MDTypography>
              <MDTypography variant="button" color="text" fontWeight="regular">
                {userInfo.speciality}
              </MDTypography>
              <MDTypography variant="button" color="text" fontWeight="regular">
                {formData.institution ? ` à ${formData.institution}` : ""}
              </MDTypography>
            </MDBox>
          </Grid>

          <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
            <AppBar position="static">
              <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
                <Tab
                  label="App"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      home
                    </Icon>
                  }
                />
               <Button onClick={handleDownloadPDF}>Télécharger PDF</Button>

                <Tab
                  label="Settings"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      settings
                    </Icon>
                  }
                />
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
        {children}
      </Card>

      <Dialog open={openEditDialog} onClose={handleEditDialogClose}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            label="Prénom"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          {formData.firstnameError && <p style={{ color: "red" }}>{formData.firstnameError}</p>}
          <TextField
            label="Nom"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          {formData.lastnameError && <p style={{ color: "red" }}>{formData.lastnameError}</p>}
          <TextField
            label="Specialité"
            name="speciality"
            value={formData.speciality}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Autocomplete
            options={institutionOptions}
            value={formData.institution}
            onChange={(event, newValue) => {
              setFormData({ ...formData, institution: newValue });
            }}
            renderInput={(params) => <TextField {...params} label="Institution" />}
          />
          <Button onClick={handleAddInst}>Add New</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>Annuler</Button>
          <Button onClick={handleUpdateUserInfo} color="primary" disabled={!isValid}>
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>
    </MDBox>
  );
}

Header.propTypes = {
  children: PropTypes.node,
};

export default Header;

