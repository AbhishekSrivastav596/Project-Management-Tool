

const Team = require('../models/Team');
const Task = require('../models/Task');
const { sendEmail } = require('../services/emailService');

const createTeam = async (req, res) => {
  try {
    const { name, members } = req.body;
    const leader = req.user.email; 
    const exitstingTeam=await Team.findOne({leader});
    if(exitstingTeam){
      return res.status(400).json({ success: false, message: 'Team already exists' });
    }
    const team = new Team({ name, members, leader });
    await team.save();
    const subject=`You have been added to the team: ${name}`;
    const text=`Hello,\n\n You have been added to the team "${name}" by ${leader}`;
    members.forEach(member=>{
      sendEmail(member, subject,text);
    });

    res.status(201).json({ success: true, data: team });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteTeam = async (req, res) => {
  const userEmail = req.user.email;  

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
  const { task, assignee, priority, deadline } = req.body;
  try {
    const leader = req.user.email; 
    const newTask = new Task({ task, assignee, leader, priority, deadline });
    await newTask.save();
    const subject = `New task assigned: ${task}`;
    const text = `Hello,\n\n You have been assigned a new task "${task}" by ${leader}.\n\nPriority: ${priority}\nDeadline: ${new Date(deadline).toLocaleDateString()}`;
    sendEmail(assignee,subject,text);
    res.status(201).json({ success: true, data: newTask });
  } catch (error) {
    console.error('Error assigning task:', error); 
    res.status(500).json({ success: false, message: 'Error assigning task', error: error.message });
  }
};

const getTeamProgress = async (req, res) => {
  try {
    const userEmail = req.user.email; 

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
    const userEmail = req.user.email; 
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
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

  
    if (new Date() > new Date(task.deadline)) {
      return res.status(403).json({ success: false, message: 'Cannot update task status after the deadline' });
    }

    task.status = status;
    await task.save();

    res.status(200).json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating task status' });
  }
};
const getTeamDetails = async (req, res) => {
  try {
    const userEmail = req.user.email; 

    const team = await Team.findOne({ leader: userEmail });

    if (!team) {
      return res.status(404).json({ success: false, message: 'Team not found' });
    }

    res.status(200).json({ success: true, data: team });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userEmail = req.user.email;


    const task = await Task.findOne({ _id: taskId, leader: userEmail });
    if (!task) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this task' });
    }

    await Task.findByIdAndDelete(taskId);
    res.status(200).json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting task' });
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
    deleteTask
};