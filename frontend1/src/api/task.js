// frondend/src/api/task.js

import axios from 'axios';
import { getToken } from './auth'; // Import getToken from auth.js

// API to get assigned tasks for the team member
export const getAssignedTasks = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/task/assigned', {
      headers: { Authorization: `Bearer ${getToken()}` }, // Use JWT token for authorization
    });
    return response.data;
  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Error fetching tasks' };
  }
};

// API to update task status
export const updateTaskStatus = async (taskId, updatedStatus) => {
  try {
    const response = await axios.put(`http://localhost:5000/api/task/${taskId}/status`, updatedStatus, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Error updating task status' };
  }
};