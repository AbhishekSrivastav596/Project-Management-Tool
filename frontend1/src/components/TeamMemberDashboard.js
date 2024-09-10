import React, { useEffect, useState } from 'react';
import { getAssignedTasks, updateTaskStatus } from '../api/task';
// import './TeamMemberDashboard.css';  // Import the updated CSS file

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
  }, []);

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
    <div className="team-member-dashboard" id="team-member-dashboard-container">
      <h2 className="dashboard-heading" id="dashboard-heading">My Tasks</h2>
      <div className="table-wrapper" id="table-wrapper">
        {tasks.length > 0 ? (
          <table className="tasks-table" id="tasks-table">
            <thead id="tasks-table-header">
              <tr>
                <th>Task</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="tasks-table-body">
              {tasks.map(task => (
                <tr key={task._id}>
                  <td>{task.task}</td>
                  <td>{task.status}</td>
                  <td>
                    <select
                      className="status-select"
                      value={task.status}
                      onChange={(e) => handleStatusChange(task._id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-tasks-message" id="no-tasks-message">No tasks assigned</p>
        )}
      </div>
      {errorMessage && <p className="error-message" id="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message" id="success-message">{successMessage}</p>}
    </div>
  );
};

export default TeamMemberDashboard;
