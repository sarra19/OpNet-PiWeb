import React, { useState, useEffect } from "react";
import axios from "axios";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Charger les questions du quiz depuis le backend lorsque le composant est monté
    const fetchQuizQuestions = async () => {
      try {
        const response = await axios.get("/api/quiz/questions");
        setQuestions(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des questions du quiz :", error);
      }
    };
    fetchQuizQuestions();
  }, []);

  const handleAnswerChange = (questionId, answerIndex) => {
    setAnswers({ ...answers, [questionId]: answerIndex });
  };

  const handleSubmit = async () => {
    try {
      // Soumettre les réponses du quiz au backend
      await axios.post("/api/quiz/answers", { answers });
      setSubmitted(true);
    } catch (error) {
      console.error("Erreur lors de la soumission des réponses du quiz :", error);
    }
  };

  return (
    <div>
      <h1>Quiz</h1>
      {submitted ? (
        <div>
          <p>Merci d'avoir soumis vos réponses.</p>
          {/* Afficher les résultats du quiz si nécessaire */}
        </div>
      ) : (
        <div>
          <h2>Questions du quiz :</h2>
          <form onSubmit={handleSubmit}>
            {questions.map((question) => (
              <div key={question._id}>
                <p>{question.text}</p>
                {question.options.map((option, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      id={`option-${index}`}
                      name={`question-${question._id}`}
                      value={index}
                      onChange={() => handleAnswerChange(question._id, index)}
                    />
                    <label htmlFor={`option-${index}`}>{option}</label>
                  </div>
                ))}
              </div>
            ))}
            <button type="submit">Soumettre</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Quiz;
