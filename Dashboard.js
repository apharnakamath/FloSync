import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Home, LogOut, Calendar, Settings, PieChart, ClipboardList } from 'lucide-react';
import './styles.css';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [daysLeft, setDaysLeft] = useState(null);

  // Calculate the number of days left until the next period based on the last period date
  useEffect(() => {
    const lastPeriodDate = localStorage.getItem('lastPeriodDate');
    if (lastPeriodDate) {
      const today = new Date();
      const lastPeriod = new Date(lastPeriodDate);
      
      // Assuming a 28-day cycle
      const nextPeriod = new Date(lastPeriod);
      nextPeriod.setDate(lastPeriod.getDate() + 28);
      
      const diffTime = nextPeriod - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
      setDaysLeft(diffDays);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="navbar-content">
          <div className="logo-container">
            <Home />
            <span className="logo-text">FloSync</span>
          </div>
          <button onClick={handleLogout} className="logout-button">
            <LogOut />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      <main className="main-content">
        <div className="period-circle">
          {daysLeft !== null ? (
            <span className="period-days">{daysLeft}</span>
          ) : (
            <span className="period-days">--</span>
          )}
        </div>
        <h2 style={{ textAlign: 'center', color: 'var(--primary-pink)' }}>
          {daysLeft !== null ? `days left for your next period!` : 'Set your last period date to track'}
        </h2>
      </main>

      <footer className="footer-nav">
        <div className="footer-content">
          <Link to="/track" className="nav-item">
            <ClipboardList />
            <span className="nav-text">Track</span>
          </Link>
          
          <Link to="/calendar" className="nav-item">
            <Calendar />
            <span className="nav-text">Calendar</span>
          </Link>
          
          <Link to="/analysis" className="nav-item">
            <PieChart />
            <span className="nav-text">Analysis</span>
          </Link>
          
          <Link to="/settings" className="nav-item">
            <Settings />
            <span className="nav-text">Settings</span>
          </Link>
        </div>
      </footer>
    </div>
  );
};

