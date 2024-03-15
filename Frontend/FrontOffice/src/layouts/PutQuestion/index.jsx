/*eslint-disable*/
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import { MenuItem } from "@mui/material";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import Header from "layouts/profile/components/Header";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";

function ModifierQuestionForm() {
  const { id } = useParams();
  console.log("Question ID:", id);
  const [formData, setFormData] = useState({
    text: "",
    options: ["", "", "", ""],
    correctOption: "", // Initialize correctOption as empty string
  });

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/question/get/${id}`);
        const questionData = response.data;

        setFormData({
          text: questionData.text,
          options: questionData.options,
          correctOption: questionData.correctOption,
        });
      } catch (error) {
        console.error("Error fetching the question:", error);
      }
    };

    fetchQuestion();
  }, [id]);

  const handleChange = (event, index) => {
    const { value } = event.target;

    const updatedOptions = [...formData.options];
    updatedOptions[index] = value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      options: updatedOptions,
    }));
  };

  const handleCorrectOptionChange = (event) => {
    const { value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      correctOption: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isFormValid = Object.values(formData).every((field) => field !== "");
      if (!isFormValid) {
        alert("Please fill out all required fields.");
        return;
      }

      const response = await axios.put(`http://localhost:5000/question/update/${id}`, formData);
      console.log(response.data);
      window.alert("Question modifiée avec succès!");
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
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
              Modifier votre question
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form" onSubmit={handleSubmit}>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Text"
                  variant="standard"
                  fullWidth
                  name="text"
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                />
              </MDBox>
              {formData.options.map((option, index) => (
                <MDBox key={index} mb={2}>
                  <MDInput
                    type="text"
                    label={`Option ${index + 1}`}
                    variant="standard"
                    fullWidth
                    name={`options[${index}]`}
                    value={option}
                    onChange={(e) => handleChange(e, index)}
                  />
                </MDBox>
              ))}
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Option correcte"
                  variant="standard"
                  fullWidth
                  select
                  name="correctOption"
                  value={formData.correctOption}
                  onChange={handleCorrectOptionChange}
                >
                  {formData.options.map((option, index) => (
                    <MenuItem key={index} value={option}>{option}</MenuItem>
                  ))}
                </MDInput>
              </MDBox>
              <MDBox mt={4} mb={1}>
                <MDButton variant="gradient" color="info" fullWidth type="submit">
                  Modifier Question
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

export default ModifierQuestionForm;
