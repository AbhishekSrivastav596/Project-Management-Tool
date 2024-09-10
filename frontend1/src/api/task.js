

import axios from 'axios';
import { getToken } from './auth'; 


export const getAssignedTasks = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/task/assigned', {
      headers: { Authorization: `Bearer ${getToken()}` }, 
    });
    return response.data;
  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Error fetching tasks' };
  }
};


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