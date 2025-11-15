// backend/routes/feedback.js
const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// GET all feedbacks
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedbacks', error: error.message });
  }
});

// POST new feedback
router.post('/', async (req, res) => {
  try {
    const { name, email, message, rating } = req.body;

    // Validation
    if (!name || !message) {
      return res.status(400).json({ message: 'Name and message are required' });
    }

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const newFeedback = new Feedback({
      name,
      email,
      message,
      rating: parseInt(rating),
    });

    const savedFeedback = await newFeedback.save();
    res.status(201).json(savedFeedback);
  } catch (error) {
    res.status(400).json({ message: 'Error creating feedback', error: error.message });
  }
});

// GET stats
router.get('/stats', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    const total = feedbacks.length;
    
    if (total === 0) {
      return res.json({
        total: 0,
        averageRating: 0,
        positive: 0,
        negative: 0,
      });
    }

    const totalRating = feedbacks.reduce((sum, f) => sum + f.rating, 0);
    const averageRating = (totalRating / total).toFixed(2);
    const positive = feedbacks.filter(f => f.rating >= 4).length;
    const negative = feedbacks.filter(f => f.rating < 3).length;

    res.json({
      total,
      averageRating: parseFloat(averageRating),
      positive,
      negative,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats', error: error.message });
  }
});

module.exports = router;