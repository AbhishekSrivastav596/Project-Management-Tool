# PROJECT MANAGEMENT TOOL
## OVERVIEW
The Project Management Tool is a comprehensive application built using the MERN stack (MongoDB, Express.js, React, Node.js). It is designed to streamline project management tasks, including role-based access control, task and project management, progress tracking, analytics, and notification (email sent when team is created and task assigned).

## FEATURES
### 1. Role-Based Access Control
#### Admin:
Possesses comprehensive control over the system, with the ability to manage all aspects of user roles and permissions. Admins can create, modify, and delete user accounts for all roles (admin, team leader, and team member), ensuring secure and appropriate access levels across the platform.
Team Leader (Project Manager): Can create and manage teams, assign tasks, and track progress within their projects. Team Leaders have elevated permissions to view and modify project details and team performance, but their access is limited to their assigned teams and projects.
#### Team Member:
Has access limited to their own tasks and project updates. Team Members can view assigned tasks, update their status, and contribute to project discussions but cannot modify team structures or access data outside their responsibilities.
### 2. Task and Project Management
#### Project Creation:
Users with the appropriate permissions can initiate new projects, specifying objectives, timelines, and resource requirements. Projects can be categorized, tagged, and organized for better management.
#### Task Assignment: 
Create detailed tasks with descriptions, deadlines, priorities, and dependencies. Assign tasks to individuals or teams, and track their progress through various stages.
#### Deadline Management:
Set and adjust deadlines for both tasks and projects. Notifications and reminders are sent as deadlines approach to ensure timely completion.
Task and Project Editing: Modify task details, reassign responsibilities, and update project scopes as necessary. Changes are tracked and logged for accountability.
### 3. Progress Tracking
#### Visual Dashboards:
View real-time progress through dynamic charts, including Gantt charts, pie charts, and bar graphs. Dashboards offer a snapshot of current status and trends.
#### Progress Tables: 
Detailed tables display task and project progress, including completion percentages, outstanding tasks, and deadlines. Customizable views allow users to filter by project, team, or individual.
### 4. Admin Capabilities
#### User Management:
Admins have full control over user accounts, including creation, modification, and deletion. They can manage roles and permissions to ensure that each user has appropriate access.
#### System Monitoring:
Admins can monitor system-wide activity, including user actions, project updates, and task statuses. This oversight helps maintain system integrity and data security.
### 5. Team Leader (Project Manager) Capabilities
#### Team Formation:
Create and configure teams, defining roles and responsibilities. Team Leaders can assign members to teams and set up team objectives.
#### Task Management: 
Assign and track tasks, adjust priorities, and manage deadlines. Team Leaders can monitor individual and team progress and provide support as needed.
#### Project Tracking:
Access detailed tracking tools to monitor overall project progress, including visual charts and status updates. Team Leaders can generate reports to assess project health and team performance.
### 6. Real-Time Email Notifications
#### Team Creation Alerts:
Automatically notify team members via email when a new team is created, including details about the team structure and initial tasks.
#### Task Assignment Notifications:
Send immediate email alerts when tasks are assigned or updated, ensuring team members are aware of their new responsibilities and deadlines.
#### Progress Updates: 
Real-time email notifications for significant project updates or changes, keeping all relevant team members informed of critical developments.
### 7. Team Member Interaction
#### Secure Login: 
Team Members can securely log in to access their assigned tasks and project information. Multi-factor authentication and strong password policies enhance security.
#### Task Status Updates:
Team Members can update the status of their tasks, add comments, and attach relevant files. They can view their progress and any feedback provided by Team Leaders.
#### Personal Dashboard:
A user-friendly dashboard displays all assigned tasks, upcoming deadlines, and recent updates, allowing Team Members to manage their work efficiently and stay organized.
## TECH STACK
### Frontend: React, React Router, CSS
### Backend: Node.js, Express.js
### Database: MongoDB
### Authentication: JWT (JSON Web Tokens)
### Nodemailer: To send emails
## INSTALLATION
# BACKEND SETUP
### Clone the repository.
### Install dependencies:
#### npm install
#### npm i cors
#### npm i express
#### npm i jsonwebtoken
#### npm i body-parser
#### npm i nodemailer
#### Create a .env file in the root of the backend directory and add your environment variables (e.g., database connection string, JWT secret).
### Start the server:
#### npm run start
# FRONTEND SETUP
### Navigate to the frontend directory.
### Install dependencies:
#### npm install
#### npm install react-router-dom
#### npm install axios
### Start the React app:
#### npm run start
## CONTACT
### For any questions or suggestions, please reach out to:

#### Abhishek Srivastava: abhisheksrivastav596@gmail.com
#### Ankit Saini: ankitsaini28052003@gmail.com
#### Anoushka Gautam: anoushkagautam0404@gmail.com
#### Manish Vishwakarma: manishv20@gmail.com
