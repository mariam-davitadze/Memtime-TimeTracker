# 🕒 Memtime UI – Time Tracking Dashboard

A React + TypeScript application for managing clients, projects, tasks, and time entries.

This project was built as a technical assessment to demonstrate clean architecture, API integration, and modern frontend practices.

---
## 📄 Task & API Documentation

### Task Description
https://lustrous-beijinho-54fcf1.netlify.app/task.html

### API Documentation
https://lustrous-beijinho-54fcf1.netlify.app/api_v1_documentation.html
---

## 🚀 Features

### 📁 Clients
- List of clients
- Filter by status
- Nested structure:
  - Client → Projects → Tasks
- Expandable UI
- Status indicators using Ant Design tags
- Loading and empty states handling

### ⏱ Time Entries
- Paginated table (server-side pagination)
- Create new time entry
- Edit existing time entry
- Modal form with validation
- Start / End time validation
- Duration calculation
- Proper API error handling
- Date formatting with “Today” support

---

## 🛠 Tech Stack

- React
- TypeScript
- React Router
- Ant Design
- Axios
- Day.js
- Create React App

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:
- REACT_APP_BASE_URL=your_api_base_url
- REACT_APP_API_KEY=your_api_key

These are used for Axios configuration and authorization headers.

---

## 📦 Installation

```bash
npm install
```
### ▶️ Run the Project
```bash
npm start
```
### App runs on
```bash
http://localhost:3000
```