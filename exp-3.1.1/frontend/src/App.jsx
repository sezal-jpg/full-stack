// Root app — wires together all three experiments via React Router 6
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import RoleRoute from './components/RoleRoute';
import Navbar from './components/Navbar';

import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import UserProfile from './pages/UserProfile';
import Unauthorized from './pages/Unauthorized';

// global MUI theme
const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#9c27b0' },
  },
  shape: { borderRadius: 8 },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            {/* default redirect */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Experiment 3.1.1 — login form with validation */}
            <Route path="/login" element={<LoginPage />} />

            {/* Experiment 3.1.3 — 403 unauthorized page */}
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Experiment 3.1.2 — routes protected by JWT auth */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<UserProfile />} />
            </Route>

            {/* Experiment 3.1.3 — admin-only route protected by role guard */}
            <Route element={<RoleRoute role="admin" />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
