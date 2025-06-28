import mongoose from 'mongoose';

const trackSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // References the User model
    },
    flowRate: {
      type: Number,
      required: true,
    },
    symptoms: [
      {
        type: String, // Array of symptom strings
      },
    ],
    mood: [
      {
        type: String, // Array of mood strings
      },
    ],
    date: {
      type: String,
      required: true, // ISO date string (e.g., "2024-11-21")
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Track = mongoose.model('Track', trackSchema);

export default Track;

