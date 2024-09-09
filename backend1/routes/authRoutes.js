const express = require('express');
const { signup, login } = require('../controllers/userController');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/signup', signup);
router.post('/login', login);
module.exports = router;
