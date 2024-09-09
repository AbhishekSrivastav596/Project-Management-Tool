const express = require('express');
const { createTeam, assignTask, getTeamProgress, getAssignedTasks, updateTaskStatus, getTeamDetails, deleteTeam } = require('../controllers/TeamController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/teams', authMiddleware, createTeam);
router.delete('/teams', authMiddleware, deleteTeam);
router.post('/task/assign', authMiddleware, assignTask);
router.get('/team/progress', authMiddleware, getTeamProgress); // Updated route
router.get('/team/details', authMiddleware, getTeamDetails); // Updated route
router.get('/task/assigned', authMiddleware, getAssignedTasks);
router.put('/task/:taskId/status', authMiddleware, updateTaskStatus);

module.exports = router;