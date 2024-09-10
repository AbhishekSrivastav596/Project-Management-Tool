const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const teamRoutes = require('./routes/teamRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const adminRoutes = require('./routes/adminRoutes');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors=require('cors');

const app = express();
connectDB();

app.use(cors({
    origin: 'http://localhost:3000' 
  }));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => res.send('API is running'));
app.use('/api', authRoutes);
app.use('/api', teamRoutes);
app.use('/api/admin', adminRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
