import React, { useState } from 'react';
import Card, { CardHeader, CardContent } from 'src/components/ui/card';
import Button from 'src/components/ui/button';
import Slider from 'src/components/ui/slider';
import { Calendar } from 'lucide-react';
import axios from 'axios'; // Ensure axios is installed
import './styles.css';

const API_BASE_URL = 'http://localhost:5000/api/track'; // Replace with your backend URL

export const Track = () => {
  const [flowRate, setFlowRate] = useState(1);
  const [symptoms, setSymptoms] = useState({
    cramps: false,
    headache: false,
    fatigue: false,
    bloating: false,
    acne: false,
  });
  const [mood, setMood] = useState({
    happy: false,
    sad: false,
    anxious: false,
    irritated: false,
    neutral: false,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSymptomToggle = (symptom) => {
    setSymptoms((prev) => ({
      ...prev,
      [symptom]: !prev[symptom],
    }));
  };

  const handleMoodToggle = (moodType) => {
    setMood((prev) => ({
      ...prev,
      [moodType]: !prev[moodType],
    }));
  };

  const handleSave = async () => {
    setError('');
    setSuccess('');

    // Validate token before making API call
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      setError('You must be logged in to save your entry.');
      return;
    }

    const data = {
      flowRate,
      symptoms: Object.keys(symptoms).filter((key) => symptoms[key]),
      mood: Object.keys(mood).filter((key) => mood[key]),
      date: new Date().toISOString().split('T')[0], // Today's date
    };

    try {
      const response = await axios.post(API_BASE_URL, data, {
        headers: {
          Authorization: `Bearer ${authToken}`, // Include the auth token
        },
      });

      if (response && response.data) {
        setSuccess('Entry saved successfully!');
        console.log('Save Response:', response.data);
      } else {
        setError('Unexpected response from the server.');
      }
    } catch (err) {
      console.error('Save Error:', err.response || err);
      setError(err.response?.data?.message || 'Failed to save entry.');
    }
  };

  return (
    <div className="track-container">
      <Card className={`track-card ${flowRate > 3 ? 'active' : ''}`}>
        <CardHeader className="track-header">
          <h2 className="section-title">Track Your Period</h2>
          <Calendar className="calendar-icon" />
        </CardHeader>
        <CardContent>
          <div className="track-content">
            {/* Flow Rate Slider */}
            <div className="flow-rate-section">
              <h3 className="section-subtitle">Flow Rate</h3>
              <Slider
                value={[flowRate]}
                onValueChange={(value) => setFlowRate(value[0])}
                max={5}
                step={1}
                className="slider"
              />
              <div className="slider-labels">
                <span>Light</span>
                <span>Medium</span>
                <span>Heavy</span>
              </div>
            </div>

            {/* Physical Symptoms */}
            <div className="symptoms-section">
              <h3 className="section-subtitle">Physical Symptoms</h3>
              <div className="button-grid">
                {Object.keys(symptoms).map((symptom) => (
                  <Button
                    key={symptom}
                    variant={symptoms[symptom] ? 'default' : 'outline'}
                    onClick={() => handleSymptomToggle(symptom)}
                    className={`symptom-button ${symptoms[symptom] ? 'active' : ''}`}
                  >
                    {symptom.charAt(0).toUpperCase() + symptom.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            {/* Mood Tracking */}
            <div className="mood-section">
              <h3 className="section-subtitle">Mood</h3>
              <div className="button-grid">
                {Object.keys(mood).map((moodType) => (
                  <Button
                    key={moodType}
                    variant={mood[moodType] ? 'default' : 'outline'}
                    onClick={() => handleMoodToggle(moodType)}
                    className={`mood-button ${mood[moodType] ? 'active' : ''}`}
                  >
                    {moodType.charAt(0).toUpperCase() + moodType.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            <Button className="save-button" onClick={handleSave}>
              Save Today's Entry
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

