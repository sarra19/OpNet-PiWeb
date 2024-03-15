/*eslint-disable*/
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import { Select, MenuItem } from "@mui/material";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import Header from "layouts/profile/components/Header";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";

function Modifier() {
  const { id } = useParams();
  console.log("Offer ID:", id);

  const [selectedOption, setSelectedOption] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skills: "",
    location: "",
    salary: 0,
    experienceLevel: "",
    offerType: "",
    publicationDate: "",
    expirationDate: "",
    contractType: "",
    internshipDuration: "",
    file: "",
  });

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/offer/get/${id}`);
        const offerData = response.data;
  
        setFormData({
          title: offerData.title,
          description: offerData.description,
          skills: offerData.skills,
          location: offerData.location,
          salary: offerData.salary,
          experienceLevel: offerData.experienceLevel,
          offerType: offerData.offerType,
          publicationDate: offerData.publicationDate,
          expirationDate: offerData.expirationDate,
          contractType: offerData.contractType,
          internshipDuration: offerData.internshipDuration,
          file: offerData.file,
        });
        
        setSelectedOption(offerData.offerType || ""); // Set a default value if offerData.offerType is undefined
      } catch (error) {
        console.error("Error fetching the offer:", error);
      }
    };
  
    fetchOffer();
  }, [id]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isFormValid = Object.values(formData).every((field) => field !== "");
      if (!isFormValid) {
        alert("Please fill out all required fields.");
        return;
      }
  
      const response = await axios.put(`http://localhost:5000/offer/updateOffer/${id}`, formData);
      console.log(response.data);
      window.alert("Offre modifiee avec succès!");
      // Optionally, you can redirect the user after a successful submit
    } catch (error) {
      console.error("Error submitting the form:", error);
      // Handle the error appropriately
    }
  };
  

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value || ""; // Use an empty string if the value is undefined
    setSelectedOption(selectedValue);
    setFormData((prevFormData) => ({
      ...prevFormData,
      offerType: selectedValue,
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
  
    // Check if the input is a date field and format it accordingly
    const formattedValue = event.target.type === 'date' ? formatDateString(value) : value;
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: formattedValue,
    }));
  };
  
  // Function to format date string to "yyyy-MM-dd" format
  const formatDateString = (inputDate) => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
  
    return `${year}-${month}-${day}`;
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
              Modifier votre offre d&rdquo;emploi
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form" onSubmit={handleSubmit}>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Titre"
                  variant="standard"
                  fullWidth
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="textarea"
                  label="Description"
                  variant="standard"
                  fullWidth
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Compétences"
                  variant="standard"
                  fullWidth
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Lieu"
                  variant="standard"
                  fullWidth
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
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
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Niveau d'expérience"
                  variant="standard"
                  fullWidth
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="date"
                  label="Date de publication"
                  variant="standard"
                  fullWidth
                  name="publicationDate"
                  value={formatDateString(formData.publicationDate)}
                  onChange={handleChange}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="date"
                  label="Date d'expiration"
                  variant="standard"
                  fullWidth
                  name="expirationDate"
                  value={formatDateString(formData.expirationDate)}
                  onChange={handleChange}
                />
              </MDBox>
              <MDBox mb={2}>
              <MDInput
  type="text"
  label="Type d'offre"
  variant="standard"
  fullWidth
  select
  name="offerType"
  value={selectedOption}
  onChange={handleOptionChange}
>
  <MenuItem value="emploi">Emploi</MenuItem>
  <MenuItem value="stage">Stage</MenuItem>
</MDInput>
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
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Durée du stage"
                  variant="standard"
                  fullWidth
                  name="internshipDuration"
                  value={formData.internshipDuration}
                  onChange={handleChange}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="file"
                  label="Image"
                  variant="standard"
                  fullWidth
                  name="file"
                  value={formData.file}
                  onChange={handleChange}
                />
              </MDBox>
              <MDBox mt={4} mb={1}>
                <MDButton variant="gradient" color="info" fullWidth type="submit">
                  Modifier Offre
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

export default Modifier;
