const express = require('express');
const { getAllUsers, getAllTasks, getAllTeams, deleteUser } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/users', authMiddleware, getAllUsers);
router.get('/tasks', authMiddleware, getAllTasks);
router.get('/teams', authMiddleware, getAllTeams);
router.delete('/user/:userId', authMiddleware, deleteUser);

module.exports = router;