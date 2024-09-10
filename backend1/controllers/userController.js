

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');



const signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  const allowedAdminEmails = ['ankitsaini28052003@gmail.com'];
  try {
    if (role === 'admin' && allowedAdminEmails.includes(email.toLowerCase())) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashedPassword, role });
      await user.save();
      res.status(201).json({ message: 'User registered' });
    } else if (role !== 'admin') {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashedPassword, role });
      await user.save();
      res.status(201).json({ message: 'User registered' });
    } else {
      res.status(400).json({ message: 'Invalid admin name' });
    }
  } catch (error) {
    console.error('Error during signup:', error); 
    res.status(500).json({ error: error.message || 'Error registering user' });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, role: user.role, userId: user._id });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: error.message || 'Error logging in' });
  }
};

module.exports = { signup, login };