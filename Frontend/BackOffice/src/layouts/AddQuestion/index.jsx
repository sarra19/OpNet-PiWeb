/*eslint-disable*/
import React, { useState } from "react";
import axios from "axios";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";


import MDBox from "components/MDBox";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  input: {
    marginBottom: theme.spacing(1),
  },
  spaceBetween: {
    margin: theme.spacing(2, 0),
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: theme.spacing(2),
  },
}));

function AddQuestionForm() {
  const classes = useStyles();

  const [text, setText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState(0);
  const [thematique, setThematique] = useState("");
  const [niveau, setNiveau] = useState("");
  const buttonStyles = {
    cursor: "pointer",
    marginRight: "5px",
  };
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://opnet-piweb.onrender.com/question/add', {
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
      <Card sx={{ mt: 4, mx: "auto", maxWidth: 900, p: 2 }}>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={1}
          mt={1}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>

            Ajouter Question
          </MDTypography>
        </MDBox>
        <MDBox className={classes.formContainer}>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <MDInput
              type="text"
              label="Question"
              variant="standard"
              fullWidth
              value={text}
              onChange={(e) => setText(e.target.value)}
              className={classes.input}
              required
            />
            {options.map((option, index) => (
              <MDInput
                key={index}
                type="text"
                label={`Option ${index + 1}`}
                variant="standard"
                fullWidth
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className={classes.input}
                required
              />
            ))}
            <MDInput
              type="select"
              label="Correct Option"
              variant="standard"
              fullWidth
              value={correctOption}
              onChange={(e) => setCorrectOption(parseInt(e.target.value))}
              className={classes.input}
              required
            >
              {options.map((option, index) => (
                <option key={index} value={index}>
                  {`Option ${index + 1}`}
                </option>
              ))}
            </MDInput>
            <MDBox className={classes.spaceBetween} />
            <InputLabel htmlFor="thematique">Thematique</InputLabel>
            <Select
             labelId="thematique"
             id="thematique"
             variant="standard"
            fullWidth
            value={thematique}
            onChange={(e) => setThematique(e.target.value)}
            className={classes.input}
            required
            >
           <MenuItem value="informatique">Informatique</MenuItem>
           <MenuItem value="electrique">Electrique</MenuItem>
           <MenuItem value="telecommunication">Telecommunication</MenuItem>
           <MenuItem value="mecanique">Mecanique</MenuItem>
           <MenuItem value="mécatronique">Mécatronique</MenuItem>
           <MenuItem value="génie civil">Génie Civil</MenuItem>
           <MenuItem value="historique">Historique</MenuItem>
          </Select>

            <MDBox className={classes.spaceBetween} />
            <InputLabel htmlFor="niveau">Niveau</InputLabel>
            <Select
              labelId="niveau"
              id="niveau"
              variant="standard"
              fullWidth
              value={niveau}
              onChange={(e) => setNiveau(e.target.value)}
              className={classes.input}
              required
            >
              <MenuItem value="facile">Facile</MenuItem>
              <MenuItem value="moyen">Moyen</MenuItem>
              <MenuItem value="difficile">Difficile</MenuItem>
            </Select>
            <div style={styles.buttonWrapper}>
            <MDButton
                variant="gradient"
                color="secondary"
                component={Link} // Utilisez le composant Link
                to="/question/ajouter" // L'URL vers laquelle vous voulez naviguer
                style={styles.button} // Appliquez les styles au bouton
              
              >
                Ajouter Question
              </MDButton>
              <MDButton
                variant="gradient"
                color="secondary"
                component={Link}
                to="/quiz"
                style={styles.button} // Appliquez les styles au bouton
              >
                Aller au quiz
              </MDButton>
              <MDButton
                variant="gradient"
                color="secondary"
                component={Link}
                to="/Question"
                style={styles.button} // Appliquez les styles au bouton
              >
                Retour
              </MDButton>
            </div>
          </form>
        </MDBox>
      </Card>
      <Footer />
    </DashboardLayout>
  );
}
const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
  },
  selectWrapper: {
    marginBottom: '20px',
  },
  inputWrapper: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
  },
  select: {
    width: '100%',
    padding: '8px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  input: {
    width: '100%',
    padding: '8px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  buttonWrapper: {
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'red',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px',
  },
  message: {
    textAlign: 'center',
    marginTop: '20px',
    color: '#f00',
  },
  quiz: {
    marginTop: '20px',
  },
};

export default AddQuestionForm;