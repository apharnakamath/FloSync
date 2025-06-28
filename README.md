# FloSync 🌸

A comprehensive period tracking and menstrual health management application designed to help individuals monitor their reproductive health with privacy and ease.
Please check out the video to see how it looks.

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [Privacy & Security](#privacy--security)
- [License](#license)

## 🌟 About

FloSync is a modern, user-friendly period tracking application that empowers users to take control of their menstrual health. Built with privacy in mind, FloSync provides comprehensive tracking features, health insights, and educational resources to support reproductive wellness.

### Why FloSync?

- **Privacy First**: Your health data stays secure and private
- **Comprehensive Tracking**: Monitor periods, symptoms, mood patterns, and more
- **Educational Resources**: Access to reliable health information
- **User-Friendly**: Clean, intuitive interface designed for daily use
- **Data-Driven Insights**: Understand your cycle patterns and trends

## ✨ Features

### 🔄 Cycle Tracking
- Period start/end date logging
- Flow intensity tracking (Light, Medium, Heavy)
- Cycle length and pattern analysis
- Prediction of next period dates

### 🎭 Mood Monitoring
- Daily mood tracking with multiple emotions
- Pattern recognition over time
- Correlation with cycle phases

### 🩺 Symptom Logging
- Track common period symptoms
- Monitor symptom severity and frequency
- Identify patterns and triggers

### 📊 Analytics & Insights
- Cycle regularity analysis
- Average cycle length calculation
- Visual charts and trends
- Exportable health reports

### 🔐 Account Management
- Secure user authentication
- Password management
- Data privacy controls

### 📚 Health Education
- Curated health information
- PCOS/PCOD resources
- Sexual health guidance
- Myth-busting content

### 📁 Project Structure
```
FloSync/
├── backend/
│   ├── controllers/
│   │   └── userController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/
│   │   ├── userModel.js
│   │   ├── trackModel.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── trackRoutes.js
│   ├── config/
│   │   ├── db.js
│   │   └── init-db.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── server.js
│   └── index.js
│
├── frontend/
   ├── components/
   │   ├── Dashboard.js
   │   ├── Calendar.js
   │   ├── Track.js
   │   ├── Login.js
   │   ├── Settings.js
   │   ├── Analysis.js
   │   └── App.js
   ├── ui/
   │   ├── card.jsx
   │   ├── card.css
   │   ├── button.jsx
   │   ├── button.css
   │   ├── slider.jsx
   │   └── slider.css
   ├── styles/
   │   └── styles.css


```

## 🛠 Tech Stack

### Frontend
- **React.js** - User interface
- **CSS3** - Styling and animations
- **Lucide React** - Icons
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB

### Security
- **bcryptjs** - Password hashing
- **JWT** - Authentication tokens
- **CORS** - Cross-origin resource sharing

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/apharnakamath/FloSync.git
   cd FloSync
   ```

2. **Install dependencies**
   ```bash
   # Install all dependencies
   npm install
   
   # If using separate frontend/backend folders:
   # cd frontend && npm install
   # cd ../backend && npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/flosync
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=30d
   CORS_ORIGIN=http://localhost:3000
   ```

4. **Database Setup**
   ```bash
   # Start MongoDB service (if running locally)
   mongod
   
   # Or use MongoDB Atlas for cloud database
   # Update MONGODB_URI with your connection string
   ```

5. **Run the application**
   ```bash
   # Check package.json for available scripts
   npm start
   
   # Or if separate dev scripts exist:
   # npm run dev
   # npm run server (for backend only)
   # npm run client (for frontend only)
   ```

6. **Access the application**
   - Application: `http://localhost:3000` (or as specified in your setup)
   - API: `http://localhost:5000` (or your configured port)

## 💡 Usage

### Getting Started

1. **Register an Account**
   - Create a new account with username and secure password
   - Your data is encrypted and stored securely

2. **Track Your First Period**
   - Log your period start date
   - Record flow intensity
   - Add any symptoms you're experiencing

3. **Monitor Daily Patterns**
   - Log daily mood and symptoms
   - Track changes throughout your cycle
   - Build a comprehensive health picture

4. **View Insights**
   - Check your cycle predictions
   - Review symptom patterns
   - Understand your unique cycle rhythm

5. **Explore Health Resources**
   - Access educational content
   - Learn about reproductive health
   - Get answers to common questions

## 📡 API Documentation

### Authentication Endpoints

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
POST /api/change-password
```

### User Data Endpoints

```http
GET /api/user/profile
PUT /api/user/profile
POST /api/user/mood
POST /api/user/symptoms
POST /api/user/flow
GET /api/user/analytics
```

### Example API Usage

```javascript
// Log a new mood entry
const response = await axios.post('/api/user/mood', {
  date: new Date(),
  happy: true,
  motivated: true,
  exhausted: false
}, {
  headers: { 'Authorization': `Bearer ${token}` }
});

// Get cycle analytics
const analytics = await axios.get('/api/user/analytics', {
  headers: { 'Authorization': `Bearer ${token}` }
});
```

## 🗄 Database Schema

### User Model
```javascript
{
  username: String (required, unique),
  password: String (required, hashed),
  moodPattern: [{
    date: Date,
    exhausted: Boolean,
    overwhelmed: Boolean,
    anxious: Boolean,
    frustrated: Boolean,
    motivated: Boolean,
    happy: Boolean
  }],
  symptoms: [{
    date: Date,
    headache: Boolean,
    nausea: Boolean,
    fatigue: Boolean,
    cramps: Boolean,
    acne: Boolean,
    bloating: Boolean,
    backPain: Boolean
  }],
  flow: [{
    date: Date,
    intensity: String (enum: ['Light', 'Medium', 'Heavy', 'None'])
  }],
  averageCycleLength: Number,
  averageGapBetweenPeriods: Number,
  lastPeriodStart: Date,
  lastPeriodEnd: Date,
  daysTillNextPeriod: Number
}
```

## 🤝 Contributing

We welcome contributions to FloSync! Here's how you can help:

### Development Process

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Test your changes**
   ```bash
   npm test  # if tests are available
   ```
5. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Contribution Guidelines

- Follow existing code style and conventions
- Write clear, descriptive commit messages
- Update documentation for new features
- Ensure your code is well-commented
- Respect user privacy and data security
- Test your changes thoroughly

### Code Style

- Use meaningful variable and function names
- Follow React best practices for components
- Use consistent indentation (2 or 4 spaces)
- Add comments for complex logic
- Keep components small and focused

### Areas for Contribution

- 🐛 Bug fixes
- ✨ New features
- 📚 Documentation improvements
- 🎨 UI/UX enhancements
- 🔒 Security improvements
- 🌐 Internationalization
- ♿ Accessibility improvements

## 🔒 Privacy & Security

FloSync takes your privacy seriously:

- **Data Encryption**: All sensitive data is encrypted
- **Secure Authentication**: Passwords are hashed using bcrypt
- **No Data Sharing**: Your personal health data is never shared
- **Local Storage**: Option to keep data locally
- **GDPR Compliant**: Following data protection regulations

### Security Features

- JWT-based authentication
- Password strength requirements
- Secure session management
- Input validation and sanitization
- CORS protection

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 FloSync

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```


---
