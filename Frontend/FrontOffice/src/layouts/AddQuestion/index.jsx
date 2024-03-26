/*eslint-disable*/
import React, { useState } from "react";
import axios from "axios";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Header from "layouts/profile/components/Header";
import MDBox from "components/MDBox";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";


function AddQuestionForm() {
  const [text, setText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState(0);
  const [thematique, setThematique] = useState("");
  const [niveau, setNiveau] = useState("");


  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };const buttonStyles = {
    cursor: "pointer",
    marginRight: "5px",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/question/add', {
        text,
        options,
        correctOption,
        thematique,
        niveau
      });
      console.log(response.data);
      // Reset form after successful submission
      setText('');
      setOptions(['', '', '', '']);
      setCorrectOption(0);
      setThematique('');
      setNiveau('');
      alert('Question added successfully!');
    } catch (error) {
      console.error('Error adding question:', error);
      alert('Failed to add question. Please try again.');
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
          Add Question
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Question:"
                variant="standard"
                fullWidth
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </MDBox>
            {options.map((option, index) => (
              <MDBox key={index} mb={2}>
                <MDInput
                  type="text"
                  label={`Option ${index + 1}:`}
                  variant="standard"
                  fullWidth
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />
              </MDBox>
            ))}
            <MDBox mb={2}>
              <MDInput
                type="select"
                label="Correct Option:"
                variant="standard"
                fullWidth
                value={correctOption}
                onChange={(e) => setCorrectOption(parseInt(e.target.value))}
              >
                {options.map((option, index) => (
                  <option key={index} value={index}>
                    {`Option ${index + 1}`}
                  </option>
                ))}
              </MDInput>
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="thematique"
                label="Thematique"
                variant="standard"
                fullWidth
                value={text}
                onChange={(e) => setThematique(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="niveau"
                label="Niveau"
                variant="standard"
                fullWidth
                value={text}
                onChange={(e) => setNiveau(e.target.value)}
              />
            </MDBox>
            <MDBox mt={4} mb={1} display="flex" justifyContent="space-evenly" alignItems="center">
              <MDButton
                variant="gradient"
                color="info"
                fullWidth
                type="submit"
                style={buttonStyles} // Réduire la taille du bouton
              >
                Add Question
              </MDButton>
              {/* Bouton de retour */}
              <MDButton
                variant="gradient"
                color="info"
                component={Link} 
                to="/Question" 
                style={buttonStyles} // Réduire la taille du bouton
              >
                Retour 
              </MDButton>
            </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      <Footer />
    </DashboardLayout>
  );
}

export default AddQuestionForm;
