// routes/trackRoutes.js
import express from 'express';

const router = express.Router();

// @desc Save tracking data
// @route POST /api/track
// @access Public
router.post('/', (req, res) => {
  const { flowRate, symptoms, mood, date } = req.body;

  if (!flowRate || !date) {
    return res.status(400).json({ message: 'Flow rate and date are required.' });
  }

  // Add logic to save data to the database
  console.log('Tracking Data Received:', { flowRate, symptoms, mood, date });

  res.status(201).json({ message: 'Tracking data saved successfully!' });
});

export default router;

