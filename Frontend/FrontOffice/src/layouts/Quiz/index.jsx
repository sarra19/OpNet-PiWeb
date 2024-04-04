/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!quizCompleted) {
        setQuizCompleted(true);
        submitAnswers();
      }
    }, timeLeft * 1000);
    return () => clearTimeout(timeout);
  }, [quizCompleted, timeLeft]);

  const handleOptionSelect = (optionIndex) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[currentQuestionIndex] = optionIndex;
    setSelectedOptions(updatedOptions);
  };

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/question/getByNiveauAndThematique/facile/informatique');
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const submitAnswers = () => {
    let totalScore = 0;
    questions.forEach((question, index) => {
      if (selectedOptions[index] === question.correctOption) {
        totalScore++;
      }
    });
    setScore(totalScore);
  };

  const handleNextQuestion = () => {
    const correctOptionIndex = questions[currentQuestionIndex]?.correctOptionIndex;
    if (parseInt(selectedOptions[currentQuestionIndex]) === correctOptionIndex) {
      setScore(score + 1);
    }
  
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOptions([...selectedOptions, '']); // Mise à jour des options sélectionnées avec une nouvelle option vide
    } else {
      setShowScore(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    }
  };

  const handleFinishQuiz = () => {
    setQuizCompleted(true);
    submitAnswers();
  };

  return (
    <DashboardLayout>
      <div style={styles.quizContainer}>
        {!quizCompleted ? (
          <div>
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
               Quiz
              </MDTypography>
            </MDBox>
            <div style={styles.questionContainer}>
              <h2 style={styles.questionNumber}>Question {currentQuestionIndex + 1}</h2>
              <h3 style={styles.questionText}>{questions[currentQuestionIndex]?.text}</h3>
              <ul style={styles.optionsList}>
  {questions[currentQuestionIndex]?.options.map((option, index) => (
    <li key={`${currentQuestionIndex}-${index}`} style={styles.optionItem}>
      <input
        type="radio"
        id={`${currentQuestionIndex}-${index}-${option}`} // Utilisez une combinaison unique pour l'ID
        name="option"
        value={option}
        checked={selectedOptions[currentQuestionIndex] === option}
        onChange={() => handleOptionSelect(option)}
        style={styles.input}
      />
      <label htmlFor={`${currentQuestionIndex}-${index}-${option}`} style={styles.optionLabel}>{option}</label>
    </li>
  ))}
</ul>
            </div>
            <div style={styles.buttonContainer}>
              <button onClick={handlePreviousQuestion} style={{ ...styles.button, backgroundColor: 'red' }} disabled={currentQuestionIndex === 0}>
                Previous
              </button>
              <button onClick={handleNextQuestion} style={{ ...styles.button, backgroundColor: 'red' }}>Next</button>
              <button onClick={handleFinishQuiz} style={{ ...styles.button, backgroundColor: 'red' }}>Finish Quiz</button>
            </div>
            <p style={styles.timeLeft}>Time Left: {timeLeft} seconds</p>
          </div>
        ) : (
          <div>
            <h1 style={styles.quizCompletedTitle}>Quiz Completed!</h1>
            <p style={styles.scoreText}>Your score: {score}/{questions.length}</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

const styles = {
  quizContainer: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f8f9fa',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  quizTitle: {
    textAlign: 'center',
    color:'#007bff',
  },
  questionContainer: {
    marginTop: '20px',
  },
  questionNumber: {
    fontSize: '1.2rem',
  },
  questionText: {
    fontSize: '1.5rem',
    marginBottom: '20px',
  },
  optionsList: {
    listStyleType: 'none',
    padding: 0,
  },
  optionItem: {
    marginBottom: '10px',
  },
  input: {
    marginRight: '10px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: 'red',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    cursor: 'not-allowed',
  },
  quizCompletedTitle: {
    textAlign: 'center',
    color: '#28a745',
    marginTop: '20px',
  },
  scoreText: {
    textAlign: 'center',
    marginTop: '10px',
    fontSize: '1.2rem',
  },
  timeLeft: {
    textAlign: 'center',
    marginTop: '10px',
    fontSize: '1.2rem',
  },
};

export default Quiz;
