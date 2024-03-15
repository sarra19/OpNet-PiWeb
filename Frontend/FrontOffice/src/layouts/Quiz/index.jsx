/*eslint-disable*/
import React, { useState, useEffect } from "react";
import axios from "axios";

function QuizComponent() {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        // Récupération des questions du quiz depuis le backend
        axios.get("/api/questions/getall")
            .then(response => {
                setQuestions(response.data);
                // Initialiser les réponses avec des valeurs par défaut
                const initialAnswers = Array(response.data.length).fill("");
                setAnswers(initialAnswers);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des questions du quiz :", error);
            });
    }, []);

    const handleAnswerChange = (e, index) => {
        const newAnswers = [...answers];
        newAnswers[index] = e.target.value;
        setAnswers(newAnswers);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Envoyer les réponses à votre backend
        axios.post("/api/answers/add", { answers })
            .then(response => {
                console.log("Réponses envoyées avec succès :", response.data);
            })
            .catch(error => {
                console.error("Erreur lors de l'envoi des réponses :", error);
            });
    };

    return (
        <div>
            <h2>Quiz</h2>
            <form onSubmit={handleSubmit}>
                {questions.map((question, index) => (
                    <div key={index}>
                        <p>{question.text}</p>
                        <select onChange={(e) => handleAnswerChange(e, index)}>
                            {question.options.map((option, optionIndex) => (
                                <option key={optionIndex} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                ))}
                <button type="submit">Soumettre</button>
            </form>
        </div>
    );
}

export default QuizComponent;

