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
    moodPattern: {
      type: Array, // [Date, Exhausted?, Overwhelmed?, Anxious?, Frustrated?, Motivated?, Happy?]
      required: false,
    },
    symptoms: {
      type: Array, // [Date, Headache?, Nausea?, Fatigue?, Cramps? Acne?, Bloating?, BackPain?]
      required: false,
    },
    flow: {
      type: Array,  // [Date, Light?, Medium?, Heavy?, None?] all strings not bools
      required: false,
    },
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
