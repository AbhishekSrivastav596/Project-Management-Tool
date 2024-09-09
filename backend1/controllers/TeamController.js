// backend/controllers/TeamController.js

const Team = require('../models/Team');
const Task = require('../models/Task');

const createTeam = async (req, res) => {
  try {
    const { name, members } = req.body;
    const leader = req.user.email; // Assuming req.user contains the authenticated user's info
    const exitstingTeam=await Team.findOne({leader});
    if(exitstingTeam){
      return res.status(400).json({ success: false, message: 'Team already exists' });
    }
    const team = new Team({ name, members, leader });
    await team.save();

    res.status(201).json({ success: true, data: team });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteTeam = async (req, res) => {
  const userEmail = req.user.email;  // Assuming req.user contains the authenticated user's info

  try {
    await Task.deleteMany({ leader: userEmail});
    const team = await Team.findOneAndDelete({ leader: userEmail });
    if (!team) {
      return res.status(404).json({ success: false, message: 'Team not found' });
    }
    res.status(200).json({ success: true, message: 'Team deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const assignTask = async (req, res) => {
  const { task, assignee } = req.body;
  try {
    const leader = req.user.email; // Get the leader's email from the authenticated user
    const newTask = new Task({ task, assignee, leader });
    await newTask.save();
    res.status(201).json({ success: true, data: newTask });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error assigning task' });
  }
};

const getTeamProgress = async (req, res) => {
  try {
    const userEmail = req.user.email; // Assuming req.user contains the authenticated user's info

    const tasks = await Task.find({ leader: userEmail });

    if (!tasks) {
      return res.status(404).json({ success: false, message: 'No tasks found' });
    }

    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAssignedTasks = async (req, res) => {
    const userEmail = req.user.email; // Assuming you have user email in req.user
    try {
        const tasks = await Task.find({ assignee: userEmail });
        res.status(200).json({ success: true, data: tasks });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching assigned tasks' });
    }
};

const updateTaskStatus = async (req, res) => {
    const { taskId } = req.params;
    const { status } = req.body;
    try {
        const task = await Task.findByIdAndUpdate(taskId, { status }, { new: true });
        res.status(200).json({ success: true, data: task });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating task status' });
    }
};
const getTeamDetails = async (req, res) => {
  try {
    const userEmail = req.user.email; // Assuming req.user contains the authenticated user's info

    const team = await Team.findOne({ leader: userEmail });

    if (!team) {
      return res.status(404).json({ success: false, message: 'Team not found' });
    }

    res.status(200).json({ success: true, data: team });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
    createTeam,
    assignTask,
    getTeamProgress,
    getAssignedTasks,
    updateTaskStatus,
    deleteTeam,
    getTeamDetails,
};