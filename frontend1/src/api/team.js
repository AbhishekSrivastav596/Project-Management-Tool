import { getToken } from './auth'; // Import getToken from auth.js

export const createTeam = async (teamData) => {
    const response = await fetch('http://localhost:5000/api/teams', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`, // Include the JWT token
        },
        body: JSON.stringify(teamData),
    });
    return await response.json();
};

export const deleteTeam = async () => {
    const response = await fetch('http://localhost:5000/api/teams', {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${getToken()}`,
        },
    });
    return await response.json();
};

export const assignTask = async (taskData) => {
    const response = await fetch('http://localhost:5000/api/task/assign', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`, // Include the JWT token
        },
        body: JSON.stringify(taskData),
    });
    return await response.json();
};

export const getTeamProgress = async () => {
    const response = await fetch('http://localhost:5000/api/team/progress', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`, // Include the JWT token
        },
    });
    return await response.json();
};

export const getTeamDetails = async () => {
    const response = await fetch('http://localhost:5000/api/team/details', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`, // Include the JWT token
        },
    });
    return await response.json();
};
export const deleteTask = async (taskId) => {
    const response = await fetch(`http://localhost:5000/api/task/${taskId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${getToken()}`, // Include the JWT token
        },
    });
    return await response.json();
};