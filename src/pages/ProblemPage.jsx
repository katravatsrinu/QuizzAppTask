import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import "../styles/problem.css";

const subjectQuotes = {
  React: "Building interactive UIs, one component at a time!",
  "Node.js": "Scalable backend solutions with JavaScript.",
  JavaScript: "The language of the web, dynamic and versatile!",
  Python: "Readable, powerful, and beginner-friendly.",
  Java: "Write once, run anywhere - the backbone of enterprise apps.",
};

const ProblemPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    axios.get("https://quiz-backend-2-fjbn.onrender.com/api/quizzes")
      .then(response => {
        console.log("Fetched Quizzes:", response.data);
        setQuizzes(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching quizzes:", error);
        setLoading(false);
      });
  }, []);

  const handleQuizClick = (quizId) => {
    navigate(`/quiz/${quizId}`);
  };

  return (
    <div className="problem-page">
      <h2 className="page-title">Available Quizzes</h2>

      {loading ? <p>Loading quizzes...</p> : (
        <div className="quiz-container">
          {quizzes.length > 0 ? (
            quizzes.map((quiz) => (
              <div className="quiz-card" key={quiz.id}>
                <h3>{quiz.title}</h3>
                <p className="quiz-description">
                  <i>{subjectQuotes[quiz.title] || "Test your knowledge!"}</i>
                </p>
                <button className="quiz-button" onClick={() => handleQuizClick(quiz.id)}>
                  Attempt Quiz
                </button>
              </div>
            ))
          ) : (
            <p className="no-quizzes">No quizzes available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProblemPage;
