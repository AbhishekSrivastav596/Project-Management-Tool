// backend/models/Team.js

const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: [{ type: String, required: true }],
  leader: { type: String, required: true },  // Reference to the team leader
});

module.exports = mongoose.model('Team', teamSchema);