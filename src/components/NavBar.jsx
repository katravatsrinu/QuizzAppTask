import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaSun, FaMoon } from "react-icons/fa"; 
import { ThemeContext } from "../components/ThemeContext"; // Import Theme Context
import "../styles/navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      setIsAuthenticated(true);
      setUserRole(role);  // Set user role (admin or user)
    }
  }, []); 

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    setUserRole(null);
    navigate("/login");
  };

  // Smooth scroll function
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav className={`navbar ${theme}`}>
      <div className="nav-container">
        {/* Logo Section */}
        <div className="logo">
          <img src="/icon.png" alt="QuizQuest Logo" className="logo-img" /> 
          <span>QuizQuest</span>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          <span><FaBars /></span>
        </div>

        {/* Navigation Links */}
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li><span onClick={() => scrollToSection("home-section")}>Home</span></li>
          
          {isAuthenticated && userRole !== "admin" && (
            <li><span onClick={() => scrollToSection("available-quizzes")}>Take Quiz</span></li>
          )}

          {isAuthenticated && userRole === "admin" && (
            <>
              <li><Link to="/leaderboard">Leaderboard</Link></li> {/* Leaderboard option for admin */}
            </>
          )}

          {isAuthenticated ? (
            <li><span onClick={handleLogout} className="logout-text">Logout</span></li>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}

          {/* Theme Toggle */}
          <li className="theme-toggle" onClick={toggleTheme}>
            <span>{theme === "dark" ? <FaSun /> : <FaMoon />}</span>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
