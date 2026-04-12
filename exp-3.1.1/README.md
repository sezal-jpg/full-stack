# Auth Project — Experiments 3.1.1, 3.1.2, 3.1.3

A single full-stack project implementing all three experiments in one working app.

---

## Tech Stack

| Layer     | Libraries                                                     |
|-----------|---------------------------------------------------------------|
| Frontend  | React 18, React Hook Form 7.49+, MUI 5.14+, React Router 6, Axios 1.6 |
| Backend   | Express 4, jsonwebtoken 9, Mongoose 7.6, bcryptjs             |
| Database  | MongoDB                                                       |

---

## Project Structure

```
auth-project/
├── backend/
│   ├── server.js              # Express entry point
│   ├── seed.js                # Creates test users in MongoDB
│   ├── .env                   # PORT, MONGO_URI, JWT_SECRET
│   ├── models/User.js         # Mongoose user schema with role
│   ├── middleware/auth.js     # JWT verify + admin guard
│   └── routes/
│       ├── auth.js            # POST /api/auth/login  register
│       └── protected.js       # GET /api/protected  /api/admin
└── frontend/
    ├── vite.config.js         # Proxies /api → localhost:3001
    └── src/
        ├── App.jsx            # All routes defined here
        ├── context/AuthContext.jsx    # Token + user state
        ├── utils/api.js               # Axios + JWT interceptor
        ├── components/
        │   ├── Navbar.jsx             # Role-based menu
        │   ├── ProtectedRoute.jsx     # Redirects unauthenticated users
        │   └── RoleRoute.jsx          # Blocks wrong-role users
        └── pages/
            ├── LoginPage.jsx          # Experiment 3.1.1
            ├── Dashboard.jsx          # Experiment 3.1.2
            ├── AdminDashboard.jsx     # Experiment 3.1.3
            ├── UserProfile.jsx
            └── Unauthorized.jsx       # 403 page
```

---

## Setup & Run

### Prerequisites
- Node.js 18+
- MongoDB running locally on port 27017

### 1. Backend

```bash
cd backend
npm install
npm run seed        # creates admin and user accounts in MongoDB
npm run dev         # starts Express on http://localhost:3001
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev         # starts Vite on http://localhost:5173
```

Open **http://localhost:5173** in your browser.

---

## Test Accounts

| Username | Password  | Role  |
|----------|-----------|-------|
| admin    | admin123  | admin |
| user     | user123   | user  |

---

## Experiment Coverage

### Experiment 3.1.1 — Login Form with React State Management
- File: `frontend/src/pages/LoginPage.jsx`
- Controlled inputs via React Hook Form `Controller`
- Client-side validation (required fields, min password length)
- Loading spinner on submit
- Success and error MUI Alerts

### Experiment 3.1.2 — Protected Routes with JWT Verification
- Files: `ProtectedRoute.jsx`, `Dashboard.jsx`, `utils/api.js`, `backend/middleware/auth.js`
- JWT signed on login, stored in localStorage
- Axios interceptor attaches Bearer token automatically
- Unauthenticated users redirected to `/login`
- Server verifies token on every protected endpoint

### Experiment 3.1.3 — Role-Based Access Control (RBAC)
- Files: `RoleRoute.jsx`, `AdminDashboard.jsx`, `Navbar.jsx`, `backend/routes/protected.js`
- User model has `role` field (`admin` | `user`)
- Admin-only route `/admin` blocked for regular users (frontend + backend)
- Navbar shows different links based on role
- `/unauthorized` page shown on blocked access

---

## API Endpoints

```
POST /api/auth/register        — create user
POST /api/auth/login           — returns JWT token

GET  /api/protected            — any logged-in user   (JWT required)
GET  /api/admin                — admins only           (JWT + role check)
```
