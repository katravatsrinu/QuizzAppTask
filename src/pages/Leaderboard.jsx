import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../components/ThemeContext"; // Import ThemeContext
import "../styles/leaderboard.css"; // Ensure you have your dark theme styling here

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const { theme } = useContext(ThemeContext); // Get the current theme

  useEffect(() => {
    // Fetch leaderboard data
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("http://localhost:5049/api/users/leaderboard");
        const data = await response.json();
        if (response.ok) {
          // Sort users by score (assuming score field exists)
          const sortedUsers = data.sort((a, b) => b.score - a.score); // Sort descending by score
          setUsers(sortedUsers);
        } else {
          console.error("Error fetching leaderboard:", data.message);
        }
      } catch (err) {
        console.error("Error:", err);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className={`leaderboard-container ${theme}`}>
      <h2>Leaderboard</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="3">No users available</td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td> {/* Assuming the user has a name field */}
                <td>{user.score}</td> {/* Assuming the user has a score field */}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
