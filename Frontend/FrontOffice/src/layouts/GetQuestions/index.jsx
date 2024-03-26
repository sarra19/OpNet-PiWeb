/*eslint-disable*/
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Header from "layouts/profile/components/Header";
import Card from "@mui/material/Card";


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

function GetQuestion() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/question/getall");
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      await axios.delete(`http://localhost:5000/question/delete/${questionId}`);
      setQuestions((prevQuestions) =>
        prevQuestions.filter((prevQuestion) => prevQuestion._id !== questionId)
      );
      window.alert("Question supprimée avec succès!");
    } catch (error) {
      console.error("Error deleting question:", error);
      window.alert("Échec de la suppression de la question. Veuillez réessayer.");
    }
  };

  return (
    <DashboardLayout>
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
              Liste Des Questions
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
                    to="/question/ajouter"
                  >
                    Ajouter  Un question 
                  </MDButton>
                  </td>
          </tr>
          <table style={tableStyles}>
          <thead>
              <tr>
                <th style={headerStyles}>Question</th>
                <th style={headerStyles}>Options</th>
                <th style={headerStyles}>Action</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((question, index) => (
                <tr key={index} style={index % 2 === 0 ? evenRowStyles : {}}>
                  <td style={cellStyles}>{question.text}</td>
                  <td style={cellStyles}>
                    {question.options.map((option, index) => (
                      <div key={index}>{`Option ${index + 1}: ${option}`}</div>
                    ))}
                  </td>
                  <td style={{ ...cellStyles, ...buttonContainerStyles }}>
                    <MDButton
                      variant="gradient"
                      color="info"
                      style={buttonStyles}
                      component={Link}
                      to={`/question/modifier/${question._id}`}
                    >
                      Modifier
                    </MDButton>
                    <MDButton
                      variant="gradient"
                      color="info"
                      style={buttonStyles}
                      onClick={() => handleDeleteQuestion(question._id)}
                    >
                      Supprimer
                    </MDButton>
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

export default GetQuestion;
