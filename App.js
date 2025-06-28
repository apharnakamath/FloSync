import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login,Signup}  from './pages/Login';
import {Dashboard} from './pages/Dashboard';
import {Track} from './pages/Track';
import {Calendar} from './pages/Calendar';
import {Analysis} from './pages/Analysis';
import {Settings} from './pages/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/track" element={<Track />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/login" />} /> {/* Default to login */}
      </Routes>
    </Router>
  );
}

export default App;

