/*eslint-disable*/
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Header from "layouts/profile/components/Header";
import MDBox from "components/MDBox";
import { Card } from "@mui/material";
import MDTypography from "components/MDTypography";

function Candidacy() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [specialite, setSpecialite] = useState("");
  const [lettreMotivation, setLettreMotivation] = useState(null);
  const [cv, setCv] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const buttonStyles = {
    cursor: "pointer",
    marginRight: "5px",
  };
  const handleCvChange = (e) => {
    setCv(e.target.files[0]);
  };

  const handleLettreMotivationChange = (e) => {
    setLettreMotivation(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("nom", nom);
      formData.append("email", email);
      formData.append("specialite", specialite);
      formData.append("lettreMotivation", lettreMotivation);
      formData.append("cv", cv);

      const response = await axios.post("http://localhost:5000/candidature/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      setLoading(false);
      alert("Candidature ajoutée avec succès!");
    } catch (error) {
      console.error("Error adding candidature:", error);
      setLoading(false);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage("Failed to add candidature. Please try again.");
      }
    }
  };

  return (
    <DashboardLayout>
    <MDBox mb={2} />
     <Card>
      <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="success"
            mx={2}
            mt={1}
            p={3}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Postuler 
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Nom"
                variant="standard"
                fullWidth
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                required
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                variant="standard"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Spécialité"
                variant="standard"
                fullWidth
                value={specialite}
                onChange={(e) => setSpecialite(e.target.value)}
                required
              />
            </MDBox>
            <MDBox mb={2}>
              <label htmlFor="cv">Upload Curriculum Vitae  </label>
              <input
                id="cv"
                type="file"
                accept="application/pdf,image/*"
                onChange={handleCvChange}
                required
              />
            </MDBox>
            <MDBox mb={2}>
              <label htmlFor="lettreMotivation">Upload Lettre  Motivation </label>
              <input
                id="lettreMotivation"
                type="file"
                accept="application/pdf,image/*"
                onChange={handleLettreMotivationChange}
                required
              />
            </MDBox>

            <MDBox mt={4} mb={1} display="flex" justifyContent="space-evenly">
              <MDButton
                variant="gradient"
                color="info"
                type="submit"
                disabled={loading}
                style={buttonStyles} // Réduire la taille du bouton
              >
                {loading ? "Envoi en cours..." : "Ajouter Candidature"}
              </MDButton>
              
              <MDButton
                variant="gradient"
                color="info"
                component={Link}
                to="/quiz/home"
                style={buttonStyles} // Réduire la taille du bouton
              >
                Passer le Quiz
              </MDButton>
              <MDButton
                variant="gradient"
                color="info"
                component={Link}
                to="/tables"
                style={buttonStyles} // Réduire la taille du bouton
              >
                Retour à la liste des candidatures
              </MDButton>
            </MDBox>
            {errorMessage && (
              <MDBox mt={2} style={buttonStyles}>
                {errorMessage}
              </MDBox>
            )}
            </MDBox>
        </MDBox>
      </Card>
      <Footer />
    </DashboardLayout>
  );
}

export default Candidacy;