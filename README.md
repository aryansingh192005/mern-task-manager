# MERN Task Manager

A full-stack task management web application built using the **MERN stack**.  
This application allows users to create, update, delete, search, filter, and sort tasks with **priority levels**, **due dates**, **status tracking**, and a clean dashboard-style interface.

---

## Features

- Add, edit, and delete tasks
- Mark tasks as completed or pending
- Assign task priority (**Low / Medium / High**)
- Set due dates for tasks
- Search tasks by title
- Filter tasks by:
  - status (all / completed / pending)
  - priority (low / medium / high)
- Sort tasks by:
  - newest first
  - oldest first
  - due date
- Dashboard statistics:
  - total tasks
  - completed tasks
  - pending tasks
  - high-priority tasks
- Overdue task highlighting
- Clear filters button
- Toast notifications for task actions
- Responsive and modern UI

---

## Tech Stack

### Frontend
- React
- Vite
- Axios
- CSS
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- dotenv
- cors

---

## Project Structure

```bash
mern-task-manager/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── taskController.js
│   ├── models/
│   │   └── Task.js
│   ├── routes/
│   │   └── taskRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── StatsCards.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   └── TaskList.jsx
│   │   ├── services/
│   │   │   └── taskService.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   └── package.json
│
├── .gitignore
└── README.md