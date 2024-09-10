// frondend/src/components/TeamMemberDashboard.js

import React, { useEffect, useState } from 'react';
import { getAssignedTasks, updateTaskStatus } from '../api/task';
import './TeamMemberDashboard.css'

const TeamMemberDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await getAssignedTasks();
      if (response.success) {
        setTasks(response.data);
      } else {
        setErrorMessage(response.message);
      }
    };

    fetchTasks();
  });

  const handleStatusChange = async (taskId, newStatus) => {
    const response = await updateTaskStatus(taskId, { status: newStatus });
    if (response.success) {
      setTasks(tasks.map(task => task._id === taskId ? { ...task, status: newStatus } : task));
      setSuccessMessage('Task status updated successfully');
    } else {
      setErrorMessage(response.message);
    }
  };

  return (
    <div>
      <h2>My Tasks</h2>
      {tasks.length > 0 ? (
        
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Deadline</th>
              <th>Assigned by</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task._id}>
                <td>{task.task}</td>
                <td>{task.status}</td>
                <td>{task.priority}</td>
                <td>{new Date(task.deadline).toLocaleDateString()}</td>
                <td>{task.leader}</td>
                <td>
                {new Date() <= new Date(task.deadline) ? (
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task._id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                ) : (
                  <p>Deadline expired</p>
                )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No tasks assigned</p>
      )}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default TeamMemberDashboard;