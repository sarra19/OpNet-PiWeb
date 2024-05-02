/* eslint-disable */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import { useLocation } from 'react-router-dom'; // Import useLocation hook
import { Link } from "react-router-dom";
import MDButton from 'components/MDButton';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

const Quiz = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const location = useLocation(); // Get location object
  const offerId = new URLSearchParams(location.search).get('offerId'); // Extract offerId from URL

  useEffect(() => {
    // Fetch data based on offerId or perform any other action needed with offerId
    // Example: Fetch offer details or initialize quiz generation based on offerId
    sessionStorage.setItem('offerId', offerId);

    console.log('Offer ID:', offerId);
  }, [offerId]); // Make sure to include offerId in the dependency array

  const handleGenerateQuiz = async (niveau, thematique) => {
    setLoading(true);
    try {
      const offerId = sessionStorage.getItem('offerId'); // Retrieve offerId from sessionStorage
      console.log(offerId);
      const response = await axios.get(`http://localhost:5000/quiz/generate/${niveau}/${thematique}/${offerId}`);
      setQuiz(response.data);
      setLoading(false);
      // Afficher une alerte lorsque le quiz est généré avec succès
      alert("Quiz generated successfully!");
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    // Submit quiz to the server
    setSubmitted(true);
    // Example: axios.post('/submit-quiz', { quiz, email });
    try {
      const quizUrl = 'http://localhost:3000/quiz';
      // Envoyer l'e-mail avec le quiz
      await axios.post('http://localhost:5000/quiz/send-email', { quiz, email });
      window.open(quizUrl, '_blank');
      alert('Quiz sent successfully to ' + email);
    } catch (error) {
      setError(error);
      setSubmitted(false);
    }

  };
  return (
    <DashboardLayout>
      <div style={styles.container}>
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

            Generer un Quiz
          </MDTypography>
        </MDBox>
        <div style={styles.selectWrapper}>
          <label htmlFor="niveau" style={styles.label}>Select niveau:</label>
          <select id="niveau" style={styles.select}>
            <option value="facile">Facile</option>
            <option value="moyen">Moyen</option>
            <option value="difficile">Difficile</option>
          </select>
        </div>
        <div style={styles.selectWrapper}>
          <label htmlFor="thematique" style={styles.label}>Select thématique:</label>
          <select id="thematique" style={styles.select}>
            <option value="informatique">Informatique</option>
            <option value="electrique">Electrique</option>
            <option value="telecommunication">Telecommunication</option>
            <option value="mecanique">Mecanique</option>
            <option value="mécatronique">Mécatronique</option>
            <option value="génie civil">Génie Civil</option>
            <option value="historique">Historique</option>
          </select>
        </div>

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
          <MDButton  variant="gradient"
            color="secondary" onClick={() => handleGenerateQuiz(document.getElementById('niveau').value, document.getElementById('thematique').value)} style={styles.button}>Generer Quiz</MDButton>
          <MDButton
            variant="gradient"
            color="secondary"
            component={Link} // Utilisez le composant Link
            to="/offerManagement" // L'URL vers laquelle vous voulez naviguer
            style={styles.button} // Appliquez les styles au bouton
          >
            Retour
          </MDButton>
        </div>
        {loading && <div style={styles.message}>Generating quiz...</div>}
        {error && <div style={styles.message}>Error generating quiz: {error.message}</div>}
        {quiz && (
          <div>
            {quiz.map((question, index) => (
              <div key={index} style={styles.question}>
                <h3>Question {index + 1}</h3>
                <p>{question.text}</p>
                <ul>
                  {question.options.map((option, optionIndex) => (
                    <li key={optionIndex}>{option}</li>
                  ))}
                </ul>
              </div>
            ))}
            {/* <button onClick={handleSubmit} disabled={submitted} style={styles.button}>Submit Quiz</button> */}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

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

export default Quiz;