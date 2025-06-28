import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    moodPattern: [{
      date: { type: Date, required: true },
      exhausted: { type: Boolean, default: false },
      overwhelmed: { type: Boolean, default: false },
      anxious: { type: Boolean, default: false },
      frustrated: { type: Boolean, default: false },
      motivated: { type: Boolean, default: false },
      happy: { type: Boolean, default: false }
    }],
    symptoms: [{
      date: { type: Date, required: true },
      headache: { type: Boolean, default: false },
      nausea: { type: Boolean, default: false },
      fatigue: { type: Boolean, default: false },
      cramps: { type: Boolean, default: false },
      acne: { type: Boolean, default: false },
      bloating: { type: Boolean, default: false },
      backPain: { type: Boolean, default: false }
    }],
    flow: [{
      date: { type: Date, required: true },
      intensity: { 
        type: String, 
        enum: ['Light', 'Medium', 'Heavy', 'None'],
        required: true 
      }
    }],
    averageCycleLength: {
      type: Number,
      required: false,
    },
    averageGapBetweenPeriods: {
      type: Number,
      required: false,
    },
    lastPeriodStart: {
      type: Date,
      required: false,
    },
    lastPeriodEnd: {
      type: Date,
      required: false,
    },
    daysTillNextPeriod: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);
export default User;
