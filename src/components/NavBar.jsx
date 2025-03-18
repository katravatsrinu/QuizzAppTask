import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); // "admin" or "user"
  const isAuthenticated = !!token;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <h1 className="logo">My App</h1>

        {/* Hamburger Icon (Click to toggle menu) */}
        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </div>

        {/* Navigation Links */}
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          {isAuthenticated && userRole !== "admin" && (
            <li><Link to="/quiz" onClick={() => setIsOpen(false)}>Take Quiz</Link></li>
          )}
          <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
          
          {isAuthenticated && userRole === "admin" && (
            <>
              <li><Link to="/profile" onClick={() => setIsOpen(false)}>Profile</Link></li>
              <li><Link to="/leaderboard" onClick={() => setIsOpen(false)}>Leaderboard</Link></li>
            </>
          )}

          {isAuthenticated ? (
            <li>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </li>
          ) : (
            <>
              <li><Link to="/login" onClick={() => setIsOpen(false)}>Login</Link></li>
              <li><Link to="/register" onClick={() => setIsOpen(false)}>Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
