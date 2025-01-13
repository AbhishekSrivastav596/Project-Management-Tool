const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = async () => {
  const USER_NAME = process.env.DB_USER;
  const PASSWORD = process.env.DB_PASS;
  const DB_NAME = process.env.DB_NAME;
  try {
    await mongoose.connect(`mongodb+srv://${USER_NAME}:${PASSWORD}@merncluster.2k4wx.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=merncluster`
    );
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
module.exports = connectDB;
