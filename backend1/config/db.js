const mongoose = require('mongoose');
const connectDB = async () => {
  const USER_NAME = 'ankit_saini85';
  const PASSWORD = 'ankit7500057688';
  const DB_NAME = 'merndb8';
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
