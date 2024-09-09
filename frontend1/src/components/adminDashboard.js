import React, { useEffect, useState } from 'react';
import { getAllUsers, getAllTasks, getAllTeams, deleteUser } from '../api/admin';
import './AdminDashboard.css';  // Import the CSS file

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [teams, setTeams] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getAllUsers();
        const tasksData = await getAllTasks();
        const teamsData = await getAllTeams();
        setUsers(usersData);
        setTasks(tasksData);
        setTeams(teamsData);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    fetchData();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Admin Dashboard</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      
      <h3>All Users</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>All Tasks</h3>
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Assignee</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task._id}>
              <td>{task.task}</td>
              <td>{task.assignee}</td>
              <td>{task.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>All Teams</h3>
      <table>
        <thead>
          <tr>
            <th>Team Name</th>
            <th>Members</th>
          </tr>
        </thead>
        <tbody>
          {teams.map(team => (
            <tr key={team._id}>
              <td>{team.name}</td>
              <td>{team.members.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
