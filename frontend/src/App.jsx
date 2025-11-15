// frontend/src/App.jsx
import React, { useState, useEffect } from 'react';
import FeedbackForm from './components/FeedbackForm';
import FeedbackTable from './components/FeedbackTable';
import StatsCards from './components/StatsCards';
import { feedbackAPI } from './services/api';
import './App.css';

function App() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    averageRating: 0,
    positive: 0,
    negative: 0,
  });
  const [loading, setLoading] = useState(true);

  // Fetch feedbacks and stats
  const fetchData = async () => {
    try {
      setLoading(true);
      const [feedbacksData, statsData] = await Promise.all([
        feedbackAPI.getAllFeedbacks(),
        feedbackAPI.getStats(),
      ]);
      setFeedbacks(feedbacksData);
      setStats(statsData);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error loading data. Please check if backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmitFeedback = async (feedbackData) => {
    await feedbackAPI.createFeedback(feedbackData);
    fetchData(); // Refresh data
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>📝 Feedback Dashboard</h1>
        <p>Share your thoughts and see what others are saying</p>
      </header>

      <main className="app-main">
        <StatsCards stats={stats} />
        <FeedbackForm onSubmit={handleSubmitFeedback} />
        <FeedbackTable feedbacks={feedbacks} />
      </main>

      <footer className="app-footer">
        <p>Built with ❤️ for Upteky SDE Intern Task</p>
      </footer>
    </div>
  );
}

export default App;