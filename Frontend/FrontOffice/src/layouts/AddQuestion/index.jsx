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

function AddQuestionForm() {
  const [text, setText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState(0);

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/question/add', {
        text,
        options,
        correctOption
      });
      console.log(response.data);
      // Reset form after successful submission
      setText('');
      setOptions(['', '', '', '']);
      setCorrectOption(0);
      alert('Question added successfully!');
    } catch (error) {
      console.error('Error adding question:', error);
      alert('Failed to add question. Please try again.');
    }
  };

  return (
    <DashboardLayout>
      <Header />
      <div className="add-question-container">
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
          <h2>Add Question</h2>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <form onSubmit={handleSubmit} className="add-question-form">
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
            <MDBox mt={4} mb={1} display="flex" justifyContent="space-evenly" alignItems="center">
              <MDButton
                variant="gradient"
                color="info"
                fullWidth
                type="submit"
                style={{ padding: "4px 12px", fontSize: "12px" }} // Réduire la taille du bouton
              >
                Add Question
              </MDButton>
              {/* Bouton de retour */}
              <MDButton
                variant="gradient"
                color="info"
                component={Link} 
                to="/Question" 
                style={{ padding: "4px 12px", fontSize: "12px" }} // Réduire la taille du bouton
              >
                Retour à la liste des questions
              </MDButton>
            </MDBox>
          </form>
        </MDBox>
      </div>
      <Footer />
    </DashboardLayout>
  );
}

export default AddQuestionForm;
