// frontend/src/components/StatsCards.jsx
import React from 'react';

const StatsCards = ({ stats }) => {
  return (
    <div className="stats-container">
      <div className="stat-card">
        <h3>Total Feedbacks</h3>
        <p className="stat-value">{stats.total}</p>
      </div>
      <div className="stat-card">
        <h3>Average Rating</h3>
        <p className="stat-value">{stats.averageRating} ⭐</p>
      </div>
      <div className="stat-card positive">
        <h3>Positive (4+)</h3>
        <p className="stat-value">{stats.positive}</p>
      </div>
      <div className="stat-card negative">
        <h3>Negative (&lt;3)</h3>
        <p className="stat-value">{stats.negative}</p>
      </div>
    </div>
  );
};

export default StatsCards;