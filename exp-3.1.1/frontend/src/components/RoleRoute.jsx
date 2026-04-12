// Experiment 3.1.3 — Restricts a route to users with a specific role
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RoleRoute = ({ role }) => {
  const { user, isAuth } = useAuth();

  if (!isAuth) return <Navigate to="/login" replace />;

  // wrong role → show 403 page instead of the route
  if (user?.role !== role) return <Navigate to="/unauthorized" replace />;

  return <Outlet />;
};

export default RoleRoute;
