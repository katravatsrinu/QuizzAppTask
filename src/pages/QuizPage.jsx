import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import axios from "axios";
import "../styles/quiz.css";

const QuizPage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate(); // Replace useHistory with useNavigate
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    axios.get(`https://quiz-backend-2-fjbn.onrender.com/api/quizzes/${quizId}/questions`)
      .then(response => {
        console.log("Full API Response:", response.data);
        if (Array.isArray(response.data)) {
          setQuestions(response.data);
          console.log("Questions state updated:", response.data);
        } else {
          console.error("Unexpected API format:", response.data);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching questions:", error);
        setLoading(false);
      });
  }, [quizId]);

  const handleAnswerSelect = (questionId, answerId) => {
    if (!submitted) {
      setAnswers(prev => ({ ...prev, [questionId]: answerId }));
    }
  };

  const handleSubmit = async () => {
    let totalScore = 0;
    questions.forEach(q => {
      const selectedAnswer = q.answers.find(a => a.id === answers[q.id]);
      if (selectedAnswer?.is_correct) {
        totalScore += 1;
      }
    });

    setScore(totalScore);
    setSubmitted(true);

    // Save score to backend
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.error("User ID not found. Please log in.");
        return;
      }

      console.log("Sending score data:", {
        userId: parseInt(userId),
        quizId: parseInt(quizId),
        score: totalScore,
      });

      await axios.post("https://quiz-backend-2-fjbn.onrender.com/api/scores", {
        userId: parseInt(userId),
        quizId: parseInt(quizId),
        score: totalScore,
      });
      console.log("Score saved successfully!");

      // Navigate to the results page or another route
      navigate(`/quiz/${quizId}/results`); // Use navigate instead of history.push
    } catch (error) {
      console.error("Error saving score:", error);
    }
  };

  const getProgress = () => {
    const answeredQuestions = Object.keys(answers).length;
    return (answeredQuestions / questions.length) * 100;
  };

  if (loading) return <p className="loading-text">Loading questions...</p>;

  return (
    <div className="quiz-page">
      <h2 className="quiz-title">Quiz Questions</h2>
      
      {/* Progress Bar */}
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${getProgress()}%` }}></div>
      </div>

      {questions.length > 0 ? (
        <ul className="question-list">
          {questions.map((q, index) => (
            <li key={q.id} className="question-item">
              <strong>Q{index + 1}:</strong> {q.question_text}
              {q.type === "single" ? (
                <ul className="answer-list">
                  {q.answers.map((answer, i) => (
                    <li key={answer.id} className="answer-item">
                      <label className="answer-label">
                        <input
                          type="radio"
                          name={`question-${q.id}`}
                          value={answer.id}
                          onChange={() => handleAnswerSelect(q.id, answer.id)}
                          checked={answers[q.id] === answer.id}
                          disabled={submitted}
                        />
                        <span className="option-number">{String.fromCharCode(65 + i)}.</span>
                        <span className="answer-text">{answer.answer_text}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="answer-list">
                  {q.answers.map((answer) => (
                    <li key={answer.id} className="answer-item">
                      <label className="answer-label">
                        <input
                          type="radio"
                          name={`question-${q.id}`}
                          value={answer.id}
                          onChange={() => handleAnswerSelect(q.id, answer.id)}
                          checked={answers[q.id] === answer.id}
                          disabled={submitted}
                        />
                        <span className="answer-text">{answer.answer_text}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-questions">No questions found for this quiz.</p>
      )}

      <button className="submit-btn" onClick={handleSubmit} disabled={submitted}>
        {submitted ? "Quiz Submitted" : "Submit Quiz"}
      </button>

      {score !== null && <h3>Total Score: {score} / {questions.length}</h3>}
    </div>
  );
};

export default QuizPage;