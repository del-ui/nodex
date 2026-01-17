# NODEX 🚀

NODEX is a **role-based issue tracking system** built with **Django REST Framework (JWT auth)** and **React**. It allows organizations to report, assign, resolve, and analyze issues efficiently based on user roles.

---

## 🧩 Features

### 🔐 Authentication

* JWT-based authentication (access & refresh tokens)
* Secure API endpoints

### 👥 Role-Based Dashboards

| Role           | Capabilities                                             |
| -------------- | -------------------------------------------------------- |
| **Admin**      | View all issues, assign technicians, analytics dashboard |
| **Technician** | View assigned issues, resolve issues                     |
| **Reporter**   | Create issues, view own issues                           |

### 📝 Issue Management

* Create issues (Reporter)
* Assign issues to technicians (Admin)
* Resolve issues (Technician / Admin)
* Role-based visibility of issues

### 📊 Admin Analytics

* Total issues
* Resolved vs unresolved
* Issues per technician
* Filters by status & technician

### 🔔 Notifications *(in progress)*

* Issue assignment alerts
* Issue resolution alerts

---

## 🏗 Tech Stack

### Backend

* Django
* Django REST Framework
* SimpleJWT
* SQLite (dev)

### Frontend

* React
* Axios
* React Router
* Recharts (analytics)

---

## 📁 Project Structure

```
nodex/
├── backend/
│   ├── nodex/
│   ├── issues/
│   ├── users/
│   └── manage.py
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── dashboards/
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Authentication Flow

1. User logs in via `/api/token/`
2. Access & refresh tokens stored in `localStorage`
3. Axios interceptor attaches `Authorization: Bearer <token>`
4. Protected API routes enforce role permissions

---

## 🔗 API Endpoints (Key)

| Endpoint              | Method   | Description      |
| --------------------- | -------- | ---------------- |
| `/api/token/`         | POST     | Login (JWT)      |
| `/api/users/me/`      | GET      | Current user     |
| `/api/issues/`        | GET/POST | Issues           |
| `/api/issues/:id/`    | PATCH    | Assign / resolve |
| `/api/analytics/`     | GET      | Admin analytics  |
| `/api/notifications/` | GET      | Notifications    |

---

## 🧠 Roles Logic Summary

* **Admin** → sees everything
* **Technician** → sees only assigned issues
* **Reporter** → sees only created issues

---

## 🛠 Current Status

✔ Authentication
✔ Role-based dashboards
✔ Issue lifecycle
✔ Admin analytics
⏳ Notifications UI & real-time updates

---

## 🔮 Roadmap

* Mark notifications as read
* Bell icon with unread count
* WebSockets (real-time notifications)
* File attachments
* SLA tracking

---

## 👨‍💻 Author

Built by **villa dev**

> NODEX — *track it, fix it, ship it.*
