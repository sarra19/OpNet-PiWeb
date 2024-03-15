import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

function CandidatureList() {
  const [candidatures, setCandidatures] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:5000/candidature/getall");
        setCandidatures(response.data);
      } catch (error) {
        console.error("Error fetching candidatures:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <div className="candidature-list-container">
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
          <h2>Liste des Candidatures</h2>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <table className="table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Spécialité</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {candidatures.map((candidature) => (
                <tr key={candidature._id}>
                  <td>{candidature.nom}</td>
                  <td>{candidature.email}</td>
                  <td>{candidature.specialite}</td>
                  <td>
                    <Link to={`/candidature/${candidature._id}`} className="btn btn-primary mr-2">
                      Détails
                    </Link>
                    <button className="btn btn-danger">Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {candidatures.length === 0 && <p>Aucune candidature disponible pour le moment.</p>}
          <MDBox mt={4}>
            <MDButton
              variant="gradient"
              color="info"
              fullWidth
              component={Link}
              to="/candidature/ajouter"
            >
              Ajouter une candidature
            </MDButton>
          </MDBox>
        </MDBox>
      </div>
      <Footer />
    </DashboardLayout>
  );
}

export default CandidatureList;
