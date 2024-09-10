import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTeam, deleteTask, assignTask, getTeamProgress, getTeamDetails, deleteTeam } from '../api/team.js';  
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const TeamLeaderDashboard = () => {
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState('');
  const [members, setMembers] = useState('');
  const [task, setTask] = useState('');
  const [assignee, setAssignee] = useState('');
  const [priority, setPriority] = useState('Important Task');
  const [deadline, setDeadline] = useState('');
  const [teamProgress, setTeamProgress] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [team, setTeam] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchTeamProgress = async () => {
      try {
        const response = await getTeamProgress();
        if (response.success) {
          setTeamProgress(response.data);
        } else {
          setErrorMessage('Error fetching team progress');
        }
      } catch (error) {
        setErrorMessage('Error fetching team progress');
      }
    };

    fetchTeamProgress();

    const fetchTeamDetails = async () => {
      try {
        const response = await getTeamDetails();
        if (response.success) {
          setTeam(response.data);
          setTeamMembers(response.data.members);
        } else {
          setErrorMessage('Error fetching team details');
        }
      } catch (error) {
        setErrorMessage('Error fetching team details');
      }
    };

    fetchTeamDetails();
  });

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    try {
      const response = await createTeam({ name: teamName, members: members.split(',') });
      if (response.success) {
        setSuccessMessage('Team created successfully');
        setErrorMessage('');
        setTeamName('');
        setMembers('');
        setTeamMembers(members.split(','));
        setTeam({ name: teamName, members: members.split(',') });
      } else {
        setErrorMessage(response.message || 'Error creating team');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('Error creating team');
      setSuccessMessage('');
    }
  };

  const handleAssignTask = async (e) => {
    e.preventDefault();
    try {
      const response = await assignTask({ task, assignee, priority, deadline });
      if (response.success) {
        setSuccessMessage('Task assigned successfully');
        setErrorMessage('');
        setAssignee('');
        setTask('');
        const progressResponse = await getTeamProgress();
        if (progressResponse.success) {
          setTeamProgress(progressResponse.data);
        } else {
          setErrorMessage('Error fetching updated team progress');
        }
      } else {
        setErrorMessage('Error assigning task');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('Error assigning task');
      setSuccessMessage('');
    }
  };

  const handleDeleteTeam = async () => {
    try {
      const response = await deleteTeam();
      if (response.success) {
        setSuccessMessage('Team deleted successfully');
        setErrorMessage('');
        setTeam(null);
        setTeamMembers([]);
      } else {
        setErrorMessage(response.message || 'Error deleting team');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('Error deleting team');
      setSuccessMessage('');
    }
  };

  const getPieChartData = () => {
    const statusCounts = { pending: 0, completed: 0, inProgress: 0 };
    teamProgress.forEach(progress => {
      if (progress.status === 'Pending') statusCounts.pending += 1;
      if (progress.status === 'Completed') statusCounts.completed += 1;
      if (progress.status === 'In Progress') statusCounts.inProgress += 1;
    });

    return {
      labels: ['Pending', 'Completed', 'In Progress'],
      datasets: [{
        data: [statusCounts.pending, statusCounts.completed, statusCounts.inProgress],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF4C61', '#2C8CC2', '#FFB844'],
        borderColor: '#1a1a1a',
        borderWidth: 1,
      }],
    };
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await deleteTask(taskId);
      if (response.success) {
        setSuccessMessage('Task deleted successfully');
        setErrorMessage('');
        setTeamProgress(teamProgress.filter(task => task._id !== taskId));
      } else {
        setErrorMessage(response.message || 'Error deleting task');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('Error deleting task');
      setSuccessMessage('');
    }
  };

  return (
    <div className="team-leader-dashboard">
      {/* <div className="dashboard-sidebar">
        <h3>Manager Workspace</h3>
        <ul>
        <li><a href="#view-progress">View Progress</a></li>
          <li><a href="#create-team">Create Team</a></li>
          <li><a href="#assign-task">Assign Task</a></li>
          
        </ul>
      </div> */}

      <div className="dashboard-content">
        <div className="chart-table-container">
          <div className="team-progress">
            <div className="chart-container">
              <h3>Team Progress</h3>
              <Pie data={getPieChartData()} />
            </div>
          </div>
          
          <div id="view-progress" className="team-progress-section">
            <h3>View Progress</h3>
            {teamProgress.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Task</th>
                    <th>Assigned To</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Deadline</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {teamProgress.map((progress, index) => (
                    <tr key={index}>
                      <td>{progress.task}</td>
                      <td>{progress.assignee}</td>
                      <td>{progress.status}</td>
                      <td>{progress.priority}</td>
                      <td>{new Date(progress.deadline).toLocaleDateString()}</td>
                      <td>
                        <button onClick={() => handleDeleteTask(progress._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : <p>No progress available</p>}
          </div>
        </div>
            
        <div id="create-team" className="create-team">
          <h3>Create Team</h3>
          <form onSubmit={handleCreateTeam}>
            <input type="text" value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder="Team Name" />
            <input type="text" value={members} onChange={(e) => setMembers(e.target.value)} placeholder="Members (emails)" />
            <button type="submit">Create</button>
          </form>
        </div>

        {team && (
          <div id="team-details" className="team-details">
            <h3>Team Details</h3>
            <p><strong>Name:</strong> {team.name}</p>
            <p><strong>Members:</strong> {team.members.join(', ')}</p>
            <button onClick={handleDeleteTeam}>Delete Team</button>
          </div>
        )}

        <div id="assign-task" className="assign-task">
        <h3>Assign Task</h3>
        <form onSubmit={handleAssignTask}>
          <div className="form-group">
            <label>Task:</label>
            <input
              type="text"
              placeholder="Enter task description"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Assignee:</label>
            <select
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              required
            >
              <option value="">Select a team member</option>
              {teamMembers.map((member, index) => (
                <option key={index} value={member}>
                  {member}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Priority:</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              required
            >
              <option value="Important Task">Important Task</option>
              <option value="Very Important Task">Very Important Task</option>
              <option value="Compulsory">Compulsory</option>
            </select>
          </div>
          <div className="form-group">
            <label>Deadline:</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
          </div>

          <button type="submit">Assign Task</button>
        </form>
        </div>

        {errorMessage && <p className="error">{errorMessage}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
      </div>
    </div>
  );
};


export default TeamLeaderDashboard;
