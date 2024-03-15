/*eslint-disable*/
import React, { useState } from "react";
import axios from "axios";
import MDTypography from "components/MDTypography";
import Card from "@mui/material/Card";
import { Select, MenuItem } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Header from "layouts/profile/components/Header";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import MDBox from "components/MDBox";

function Ajouter() {
  const [selectedOption, setSelectedOption] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skills: "",
    location: "",
    salary: "",
    experienceLevel: "",
    offerType: "",
    publicationDate: "", // Ne pas inclure publicationDate dans les champs requis car il est défini automatiquement
    expirationDate: "",
    file: "",
    contractType: "",
    internshipDuration: "",
    errors: {},
  });
  const [imagePath, setImagePath] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = {};
    try {
      console.log("Form Data:", formData);

      const formDataToSend = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split('T')[0];
      formDataToSend.append('publicationDate', formattedDate); // Assurez-vous que la publicationDate est toujours définie sur la date actuelle

      const requiredFields = [
        "title",
        "description",
        "skills",
        "offerType",
        // Ne pas inclure publicationDate dans les champs requis
        "expirationDate",
      ];
      let isFormValid = true;

      requiredFields.forEach((field) => {
        if (formData[field] === "") {
          errors[field] = "Ce champ est obligatoire";
          isFormValid = false;
        }
      });

      if (formData.expirationDate && formData.expirationDate < formattedDate) {
        errors.expirationDate = "La date d'expiration ne peut pas être avant la date actuelle.";
        isFormValid = false;
      }

      if (!isFormValid) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          errors: errors,
        }));
        return;
      }

      const response = await axios.post("http://localhost:5000/offer/add", formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      setImagePath(response.data.imagePath);
      window.alert("Offre ajoutée avec succès!");
    } catch (error) {
      console.error("Error submitting the form:", error);
      // Handle the error appropriately
    }
  };

  const handleOptionChange = (event) => {
    const selectedOfferType = event.target.value;
    setSelectedOption(selectedOfferType);
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      offerType: selectedOfferType,
      contractType: selectedOfferType === "emploi" ? "" : "stage",
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // Mettre à jour offerType si le champ modifié est offerType
    if (name === "offerType") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        offerType: value,
        contractType: value === "emploi" ? "" : "stage",
      }));
    }
  };
  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      file: file,
    }));
  };

  return (
    <DashboardLayout>
      <MDBox mb={2} />
      <Header>
        <Card>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="success"
            mx={2}
            mt={-3}
            p={3}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Publiez votre offre emploi
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form" onSubmit={handleSubmit}>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Titre *"
                  variant="standard"
                  fullWidth
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  error={formData.errors.title} 
                />
                {formData.errors.title && (
                  <MDTypography variant="caption" color="error">
                    {formData.errors.title}
                  </MDTypography>
                )}
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="textarea"
                  label="Description *"
                  variant="standard"
                  fullWidth
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  error={formData.errors.description}
                />
                {formData.errors.description && (
                  <MDTypography variant="caption" color="error">
                    {formData.errors.description}
                  </MDTypography>
                )}
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Skills *"
                  variant="standard"
                  fullWidth
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  error={formData.errors.skills}
                />
                {formData.errors.skills && (
                  <MDTypography variant="caption" color="error">
                    {formData.errors.skills}
                  </MDTypography>
                )}
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Lieu "
                  variant="standard"
                  fullWidth
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  error={formData.errors.location}
                />
                {formData.errors.location && (
                  <MDTypography variant="caption" color="error">
                    {formData.errors.location}
                  </MDTypography>
                )}
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="number"
                  label="Salaire"
                  variant="standard"
                  fullWidth
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  error={formData.errors.salary}
                />
                {formData.errors.salary && (
                  <MDTypography variant="caption" color="error">
                    {formData.errors.salary}
                  </MDTypography>
                )}
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Niveau d'expérience "
                  variant="standard"
                  fullWidth
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  error={formData.errors.experienceLevel}
                />
                {formData.errors.experienceLevel && (
                  <MDTypography variant="caption" color="error">
                    {formData.errors.experienceLevel}
                  </MDTypography>
                )}
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Type d'offre *"
                  variant="standard"
                  fullWidth
                  select
                  name="offerType"
                  value={formData.offerType}
                  onChange={handleOptionChange}
                  error={formData.errors.offerType}
                >
                  <MenuItem value="emploi">Emploi</MenuItem>
                  <MenuItem value="stage">Stage</MenuItem>
                </MDInput>
                {formData.errors.offerType && (
                  <MDTypography variant="caption" color="error">
                    {formData.errors.offerType}
                  </MDTypography>
                )}
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Type de contrat"
                  variant="standard"
                  fullWidth
                  select
                  name="contractType"
                  value={formData.contractType}
                  onChange={handleChange}
                >
                  <MenuItem value="CDI">CDI</MenuItem>
                  <MenuItem value="CDD">CDD</MenuItem>
                  <MenuItem value="freelance">Freelance</MenuItem>
                  <MenuItem value="stage">Stage</MenuItem>
                </MDInput>
              </MDBox>
              {formData.contractType === "stage" && (
                <MDBox mb={2}>
                  <MDInput
                    type="text"
                    label="Durée du stage"
                    variant="standard"
                    fullWidth
                    name="internshipDuration"
                    value={formData.internshipDuration}
                    onChange={handleChange}
                    error={formData.errors.internshipDuration}
                  />
                  {formData.errors.internshipDuration && (
                    <MDTypography variant="caption" color="error">
                      {formData.errors.internshipDuration}
                    </MDTypography>
                  )}
                </MDBox>
              )}
              <MDBox mb={2}>
                <MDInput
                  type="date"
                  label="Date d'expiration *"
                  variant="standard"
                  fullWidth
                  name="expirationDate"
                  value={formData.expirationDate}
                  onChange={handleChange}
                  error={formData.errors.expirationDate}
                />
                {formData.errors.expirationDate && (
                  <MDTypography variant="caption" color="error">
                    {formData.errors.expirationDate}
                  </MDTypography>
                )}
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="file"
                  label="Logo de l'entreprise"
                  variant="standard"
                  fullWidth
                  name="file"
                  onChange={handleImageChange}
                  error={formData.errors.file}
                />
                {formData.errors.file && (
                  <MDTypography variant="caption" color="error">
                    {formData.errors.file}
                  </MDTypography>
                )}
              </MDBox>
              <MDBox mt={4} mb={1}>
                <MDButton variant="gradient" color="info" fullWidth type="submit">
                  Ajouter Offre
                </MDButton>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default Ajouter;
