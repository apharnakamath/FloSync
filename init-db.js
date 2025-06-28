// scripts/init-db.js
const mongoose = require('mongoose');
const { EducationalContent } = require('../models');

const initializeDatabase = async () => {
  try {
    // Add initial educational content
    const initialContent = [
      {
        title: 'Understanding Your Menstrual Cycle',
        category: 'Period Health',
        content: 'Detailed content about menstrual cycles...',
        tags: ['menstruation', 'health', 'education'],
        verified: true
      },
      {
        title: 'PCOS Symptoms and Management',
        category: 'PCOS/PCOD',
        content: 'Comprehensive guide to PCOS...',
        tags: ['PCOS', 'hormones', 'health'],
        verified: true
      }
      // Add more initial content as needed
    ];

    await EducationalContent.insertMany(initialContent);
    console.log('Database initialized with initial content');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    mongoose.connection.close();
  }
};


module.exports = initializeDatabase;
