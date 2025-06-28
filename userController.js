import bcrypt from 'bcryptjs';  // For hashing passwords
import jwt from 'jsonwebtoken';  // For generating JWT tokens
import User from '../models/userModel.js';  // MongoDB User model

// Register User
export const registerUser = async (req, res) => {
  const { username, password, lastPeriodDate } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Debug Logs
    console.log("Registering User:");
    console.log("Username:", username);
    console.log("Plain Password:", password);
    console.log("Hashed Password:", hashedPassword);

    // Create a new user
    const user = new User({ username, password: hashedPassword, lastPeriodDate });

    // Save the user to the database
    await user.save();

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    // Return the token as the response
    res.json({ token });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: 'Error while registering', error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log("Logging in User:");
    console.log("Username provided:", username);

    // Retrieve the user
    const user = await User.findOne({ username });
    if (!user) {
      console.log("No user found with username:", username);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log("User retrieved from database:", user);

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match result:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: 'Error during login', error: error.message });
  }
};


