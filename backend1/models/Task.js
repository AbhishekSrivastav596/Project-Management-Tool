const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
    },
    assignee: {
        type: String, 
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending',
    },
    leader: {
        type: String, 
        required: true,
    },
    priority: {
        type: String,
        enum: ['Important Task', 'Very Important Task', 'Compulsory'],
        required: true,
    },
    deadline: {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model('Task', TaskSchema);