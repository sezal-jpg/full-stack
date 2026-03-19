# Experiment 2.2.2 — JWT Authentication for Banking API

A secure REST API built with Node.js, Express, MongoDB, and JWT authentication.

---

## Project Structure

```
banking-jwt/
├── config/
│   └── db.js                  # MongoDB connection
├── controllers/
│   ├── authController.js      # register, login, refresh, logout
│   └── bankController.js      # balance, deposit, withdraw, statement
├── middleware/
│   └── auth.js                # JWT verification middleware
├── models/
│   └── User.js                # Mongoose schema with bcrypt hashing
├── routes/
│   ├── authRoutes.js          # /api/auth/*
│   └── bankRoutes.js          # /api/bank/* (all protected)
├── utils/
│   └── jwt.js                 # Token generation and verification helpers
├── .env                       # Environment variables
├── server.js                  # App entry point
└── BankingJWT.postman_collection.json
```

---

## Setup & Run

### 1. Install dependencies
```bash
npm install
```

### 2. Configure `.env`
```
MONGO_URI=mongodb://localhost:27017/banking_jwt_db
ACCESS_TOKEN_SECRET=your_secret_here
REFRESH_TOKEN_SECRET=your_refresh_secret_here
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
PORT=5000
```

### 3. Start the server
```bash
npm start          # normal
npm run dev        # with nodemon (auto-restart)
```

---

## API Endpoints

### Auth (Public)

| Method | Endpoint              | Description                          |
|--------|-----------------------|--------------------------------------|
| POST   | /api/auth/register    | Create a new account                 |
| POST   | /api/auth/login       | Login and receive tokens             |
| POST   | /api/auth/refresh     | Get new access token via refresh     |
| POST   | /api/auth/logout      | Invalidate refresh token (protected) |

### Banking (Protected — requires `Authorization: Bearer <token>`)

| Method | Endpoint              | Description                |
|--------|-----------------------|----------------------------|
| GET    | /api/bank/balance     | Check account balance      |
| POST   | /api/bank/deposit     | Deposit money              |
| POST   | /api/bank/withdraw    | Withdraw money             |
| GET    | /api/bank/statement   | View transaction history   |
| GET    | /api/bank/profile     | View account details       |

---

## How JWT Flow Works

```
1. User registers → password hashed with bcrypt and stored
2. User logs in   → server issues accessToken (15min) + refreshToken (7 days)
3. User requests a protected route → sends accessToken in Authorization header
4. Middleware verifies token → grants or denies access
5. Access token expires → client sends refreshToken to /api/auth/refresh
6. User logs out → refreshToken cleared from DB, can't be reused
```

---

## Testing with Postman

1. Import `BankingJWT.postman_collection.json` into Postman
2. Run **Register**, then **Login** (tokens are auto-saved as variables)
3. Run any banking endpoint — the token is applied automatically
4. Try **"Access Without Token"** to see the 401 response
5. Test **Refresh Token** to simulate token expiry recovery
