import React from "react";
import "../styles/home.css";
import ProblemPage from "./ProblemPage";

const Home = () => {
  return (
    <section id="home-section">  {/* Added ID here */}
      <div className="quiz-title-container">
        <h1 className="quiz-title">
          <span>Q</span>
          <span>U</span>
          <span>I</span>
          <span>Z</span>
          <span>&nbsp;</span>
          <span>Q</span>
          <span>U</span>
          <span>E</span>
          <span>S</span>
          <span>T</span>
        </h1>
        <p className="quiz-quote">"Knowledge is power, but wisdom is knowing how to use it!"</p>
      </div>

      {/* Available Quizzes Section */}
      <section id="available-quizzes">
        <ProblemPage />
      </section>
    </section>
  );
};

export default Home;
