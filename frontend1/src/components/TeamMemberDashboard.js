import React, { useEffect, useState } from 'react';
import { getAssignedTasks, updateTaskStatus } from '../api/task';
// CSS styles from the separate CSS file are now in app.css

const TeamMemberDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
 const [email, setEmail] = useState('');

  useEffect(() => {
  
    const userEmail = localStorage.getItem('email');
    setEmail(userEmail);
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
    <div id="team-member-dashboard-container">
      <h2 className='name-showing-member'>Welcome, {email}</h2>
      <h2 id="dashboard-heading">My Tasks</h2>
      {tasks.length > 0 ? (
        <div id="table-wrapper">
          <table id="tasks-table">
            <thead id="tasks-table-header">
              <tr>
                <th>Task</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Deadline</th>
                <th>Assigned by</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="tasks-table-body">
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
                        className="status-select"
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
        </div>
      ) : (
        <p id="no-tasks-message">No tasks assigned</p>
      )}
      {errorMessage && <p id="error-message">{errorMessage}</p>}
      {successMessage && <p id="success-message">{successMessage}</p>}
    </div>
  );
};

export default TeamMemberDashboard;
