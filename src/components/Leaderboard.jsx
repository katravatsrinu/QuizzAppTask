import React from 'react';
import '../styles/leaderboard.css'; // Import CSS file for styling

const leaderboardData = [
  {
    "id": 1,
    "rank": 2,
    "userId": 1,
    "score": 8,
    "timestamp": "2025-03-19 12:59:18",
    "name": "srinu",
    "email": "srinuu@gmail.com",
    "role": "user",
    "createdAt": "2025-03-18 08:38:13"
  },
  {
    "id": 2,
    "rank": 2,
    "userId": 2,
    "score": 8,
    "timestamp": "2025-03-19 13:02:36",
    "name": "Ramu",
    "email": "ramu4123@gmail.com",
    "role": "user",
    "createdAt": "2025-03-18 10:23:04"
  },
  {
    "id": 3,
    "rank": 1,
    "userId": 13,
    "score": 85,
    "timestamp": "2025-03-19 13:48:15",
    "name": "k srinu",
    "email": "mr.comrade380@gmail.com",
    "role": "user",
    "createdAt": "2025-03-19 07:40:47"
  },
  {
    "id": 4,
    "rank": 1,
    "userId": 14,
    "score": 85,
    "timestamp": "2025-03-19 13:58:56",
    "name": "srinu",
    "email": "katravathsreenu380@gmail.com",
    "role": "admin",
    "createdAt": "2025-03-19 09:15:41"
  }
];

const Leaderboard = ({ data }) => {
  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-title">Leaderboard</h1>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.id}</td>
              <td>{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <Leaderboard data={leaderboardData} />
    </div>
  );
};

export default App;
