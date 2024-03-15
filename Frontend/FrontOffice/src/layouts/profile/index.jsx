/* eslint-disable */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import Header from "layouts/profile/components/Header";
import MDTypography from "components/MDTypography";

// CSS Styles
const tableStyles = {
  width: "100%",
  borderCollapse: "collapse",
};

const cellStyles = {
  padding: "8px",
  textAlign: "center",
  borderBottom: "1px solid #ddd",
  fontSize: "12px",
};

const evenRowStyles = {
  backgroundColor: "#f2f2f2",
};

const headerStyles = {
  ...cellStyles,
  color: "red",
  textAlign: "center",
};

const buttonContainerStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "10px",
};

const buttonStyles = {
  cursor: "pointer",
  marginRight: "5px",
};

function Offers() {
  const [offers, setOffers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetchOffers();
  }, [searchTerm, sortOrder]);

  const fetchOffers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/offer/getall", {
        params: {
          searchTerm: searchTerm,
          sortOrder: sortOrder,
        },
      });
      setOffers(response.data);
      console.log('Search with searchTerm:', searchTerm, 'and sortOrder:', sortOrder);
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  };

  const handleDeleteOffer = async (offerId) => {
    try {
      if (!offerId || typeof offerId !== "string") {
        console.error("Invalid offer ID:", offerId);
        return;
      }

      await axios.delete(`http://localhost:5000/offer/deleteOffer/${offerId}`);

      setOffers((prevOffers) =>
        prevOffers.filter((prevOffer) => prevOffer._id !== offerId)
      );
      window.alert("Offre supprimée avec succès!");
    } catch (error) {
      console.error(
        "Error deleting offer:",
        error.response ? error.response.data : error.message
      );
    }
  };


  return (
    <DashboardLayout>
      <Header>
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
              Liste Des Offres
            </MDTypography>
          </MDBox>
        {/* Your existing header content */}
      
      <MDBox mt={8}>
        <MDBox mb={3}>
          <tr>
            <td colSpan="6" style={cellStyles}>
                  <MDButton
                    variant="gradient"
                    color="info"
                    fullWidth
                    component={Link}
                    to="/offers/ajouter"
                  >
                    Ajouter  Un Offre
                  </MDButton>
                
            </td>
          </tr>
          <table style={tableStyles}>
          <thead>
  <tr>
    <th style={headerStyles}>Title</th>
    <th style={headerStyles}>Description</th>
    <th style={headerStyles}>Location</th>
    <th style={headerStyles}>Salary</th>
    <th style={headerStyles}>Experience Level</th>
    <th style={headerStyles}>Offer Type</th>
    <th style={headerStyles}>Publication Date</th>
    <th style={headerStyles}>Expiration Date</th>
    <th style={headerStyles}>Contract Type</th>
    <th style={headerStyles}>Internship Duration</th>
    <th style={headerStyles}>Actions</th>
  </tr>
</thead>
<tbody>
  {offers.map((offer, index) => (
    <tr key={index} style={index % 2 === 0 ? evenRowStyles : {}}>
      <td style={cellStyles}>{offer.title}</td>
      <td style={cellStyles}>{offer.description}</td>
      <td style={cellStyles}>{offer.location}</td>
      <td style={cellStyles}>{offer.salary}</td>
      <td style={cellStyles}>{offer.experienceLevel}</td>
      <td style={cellStyles}>{offer.offerType}</td>
      <td style={cellStyles}>{offer.publicationDate}</td>
      <td style={cellStyles}>{offer.expirationDate}</td>
      <td style={cellStyles}>{offer.contractType}</td>
      <td style={cellStyles}>{offer.internshipDuration}</td>
      <td style={{ ...cellStyles, ...buttonContainerStyles }}>
        <MDButton variant="gradient" color="info" style={buttonStyles}>
          <Link to={`/offers/modifier/${offer._id}`} style={{ textDecoration: "none", color: "white" }}>Modifier</Link>
        </MDButton>
        <MDButton variant="gradient" color="info" style={buttonStyles} onClick={() => handleDeleteOffer(offer._id)}>
          Supprimer
        </MDButton>
      </td>
    </tr>
  ))}
</tbody>
          </table>
        </MDBox>
      </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default Offers;
