// Experiment 3.1.2 — Redirects to login if user is not authenticated
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { isAuth } = useAuth();

  // if no token is present, push user back to login page
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
