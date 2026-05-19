# 🚀 GigFlow – Smart Leads Dashboard

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![License](https://img.shields.io/badge/license-MIT-yellow)

A full-stack lead management dashboard built using the MERN stack.

GigFlow enables teams to securely manage leads, authenticate users, apply advanced filtering, search records, and perform role-based operations through a clean and responsive dashboard interface.

---

# ✨ Highlights

- Secure JWT Authentication
- Role-Based Access Control
- Lead CRUD Operations
- Search & Filtering
- Pagination Support
- Protected Routes
- Fully Responsive UI
- REST API Architecture

---

# 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Screenshots](#-screenshots)
- [Folder Structure](#-folder-structure)
- [Environment Variables](#-environment-variables)
- [Installation & Setup](#-installation--setup)
- [API Endpoints](#-api-endpoints)
- [Filtering & Search](#-filtering--search)
- [Future Improvements](#-future-improvements)
- [Author](#-author)

---

# 🌐 Live Demo

## Frontend

```txt
https://your-frontend.vercel.app
```

## Backend

```txt
https://your-backend.onrender.com
```

---

# 🚀 Features

## 🔐 Authentication

- User Registration
- User Login
- JWT-based Authentication
- Protected Routes
- Persistent Sessions

---

## 👥 Role-Based Access Control

### Admin Access

- Create Leads
- View Leads
- Delete Leads
- Manage System Data

### Sales Access

- View Leads
- Update Leads
- Manage Assigned Leads

---

## 📋 Lead Management

- Create Leads
- View Leads
- Delete Leads
- Search Leads
- Filter Leads
- Pagination Support

---

## 🔎 Search & Filters

- Search by lead name/email
- Filter by lead status
- Filter by lead source
- Paginated lead listing

---

# 🛠️ Tech Stack

## Frontend

- React
- TypeScript
- Tailwind CSS
- React Router DOM
- Axios

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

---

# 🧠 Architecture

GigFlow follows a modern client-server architecture.

```text
Client (React + TS)
        │
        ▼
REST API (Express.js)
        │
        ▼
MongoDB Database
```

Authentication flow:

```text
User Login
    │
    ▼
JWT Token Generated
    │
    ▼
Protected API Requests
```

---

# 📦 Lead Schema

Each lead contains:

```json
{
  "name": "Rahul",
  "email": "rahul@gmail.com",
  "status": "Qualified",
  "source": "Instagram"
}
```

---

# 📸 Screenshots

## 🔐 Login Page

Add login page screenshot here.

```md
![Login Page](screenshots/login.png)
```

---

## 📊 Dashboard

Add dashboard screenshot here.

```md
![Dashboard](screenshots/dashboard.png)
```

---

## 📋 Leads Table

Add leads table screenshot here.

```md
![Leads Table](screenshots/leads-table.png)
```

---

# 📂 Folder Structure

```text
gigflow/
│
├── client/
│   ├── src/
│   ├── pages/
│   ├── components/
│   ├── hooks/
│   ├── context/
│   └── ...
│
├── server/
│   ├── src/
│   ├── controllers/
│   ├── routes/
│   ├── middlewares/
│   ├── models/
│   ├── utils/
│   └── ...
│
├── screenshots/
│   ├── login.png
│   ├── dashboard.png
│   └── leads-table.png
│
├── README.md
└── package.json
```

---

# 🔑 Environment Variables

Create a `.env` file inside the `server` directory.

## Example

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/sinjaa18/gigflow-smart-leads-dashboard.git

cd gigflow-smart-leads-dashboard
```

---

# 🖥️ Backend Setup

```bash
cd server

npm install

npm run dev
```

Backend runs on:

```txt
http://localhost:5000
```

---

# 💻 Frontend Setup

Open a new terminal:

```bash
cd client

npm install

npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

---

# 📡 API Endpoints

## 🔐 Authentication Routes

### Register User

```http
POST /api/auth/register
```

### Login User

```http
POST /api/auth/login
```

---

## 📋 Lead Routes

### Get Leads

```http
GET /api/leads
```

### Create Lead

```http
POST /api/leads
```

### Delete Lead

```http
DELETE /api/leads/:id
```

### Update Lead

```http
PATCH /api/leads/:id
```

---

# 🔎 Filtering & Search

## Search Leads

```txt
/api/leads?search=rahul
```

---

## Filter by Status

```txt
/api/leads?status=Qualified
```

---

## Filter by Source

```txt
/api/leads?source=Instagram
```

---

## Pagination

```txt
/api/leads?page=1
```

---

# 🔒 Security Features

- Password hashing using bcryptjs
- JWT authentication middleware
- Protected backend routes
- Role-based authorization
- Input validation
- Secure API architecture

---

# 🚀 Future Improvements

- [ ] Dashboard Analytics
- [ ] CSV Export
- [ ] Dark Mode
- [ ] Activity Logs
- [ ] Lead Assignment System
- [ ] Email Notifications
- [ ] Drag & Drop Kanban Board
- [ ] Real-time Updates
- [ ] Advanced Charts & Insights

---

# 📚 Learning Outcomes

This project demonstrates understanding of:

- Full-stack MERN architecture
- Authentication & Authorization
- REST API design
- MongoDB schema modeling
- Protected routing
- State management
- Pagination & filtering
- Role-based systems
- Clean frontend-backend separation

---

# 👨‍💻 Author

## Sintu Kumar

- 📧 Email: santa143ns@gmail.com
- 💼 LinkedIn: https://www.linkedin.com/in/sintu-kumar-83350b324/
- 🐙 GitHub: https://github.com/sinjaa18/

---

# ⭐ Support

If you found this project useful, consider giving the repository a star on GitHub.