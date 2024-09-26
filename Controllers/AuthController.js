const UserModal = require("../Models/User");
const bcrypt = require("bcryptjs");

// Signup functionality

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModal.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User already exists, please log in",
        success: false,
      });
    }
    const userModal = new UserModal({ name, email, password });
    userModal.password = await bcrypt.hash(password, 10);
    await userModal.save();
    res.status(200).json({ message: "Signup successful", success: true });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

// Login functionality
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModal.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found, please sign up",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
        success: false,
      });
    }

    // If login successful
    res.status(200).json({
      message: "Login successful",
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

module.exports = { signup, login };
