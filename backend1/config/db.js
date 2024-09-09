const mongoose = require('mongoose');
const connectDB = async () => {
  const USER_NAME = 'Abhishek_123';
  const PASSWORD = 'aquaguard';
  const DB_NAME = 'New_Project';
  try {
    await mongoose.connect(`mongodb+srv://${USER_NAME}:${PASSWORD}@merncluster.2ao7u.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=MernCluster`
    );
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
module.exports = connectDB;
