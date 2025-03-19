import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeContext";  // Import Theme Context
import "./App.css";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Signup";
import ProblemPage from "./pages/ProblemPage";
import QuizPage from "./pages/QuizPage";
import Leaderboard from "./components/Leaderboard";  // Import Leaderboard Component

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/quizzes" element={<ProblemPage />} />
          <Route path="/quiz/:quizId" element={<QuizPage />} />
          <Route path="/leaderboard" element={<Leaderboard />} /> {/* Leaderboard Route */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
