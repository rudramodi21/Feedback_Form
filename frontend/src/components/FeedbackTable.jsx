// frontend/src/components/FeedbackTable.jsx
import React from 'react';

const FeedbackTable = ({ feedbacks }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const getRatingStars = (rating) => {
    return '⭐'.repeat(rating);
  };

  return (
    <div className="feedback-table-container">
      <h2>All Feedbacks</h2>
      {feedbacks.length === 0 ? (
        <p className="no-data">No feedbacks yet. Be the first to submit!</p>
      ) : (
        <div className="table-responsive">
          <table className="feedback-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Rating</th>
                <th>Message</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((feedback) => (
                <tr key={feedback._id}>
                  <td>{feedback.name}</td>
                  <td>{feedback.email}</td>
                  <td>
                    <span className={`rating rating-${feedback.rating}`}>
                      {getRatingStars(feedback.rating)} ({feedback.rating})
                    </span>
                  </td>
                  <td className="message-cell">{feedback.message}</td>
                  <td>{formatDate(feedback.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FeedbackTable;