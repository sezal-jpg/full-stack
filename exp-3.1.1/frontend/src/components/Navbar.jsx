// Experiment 3.1.3 — Navbar that shows different links based on user role
import { AppBar, Toolbar, Typography, Button, Box, Chip } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
          Auth App
        </Typography>

        {isAuth ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* show role badge so it's clear who's logged in */}
            <Chip
              label={`${user?.username} (${user?.role})`}
              color={user?.role === 'admin' ? 'warning' : 'default'}
              size="small"
              sx={{ fontWeight: 600 }}
            />

            <Button color="inherit" component={Link} to="/dashboard">
              Dashboard
            </Button>

            {/* admin-only menu item */}
            {user?.role === 'admin' && (
              <Button color="inherit" component={Link} to="/admin">
                Admin Panel
              </Button>
            )}

            <Button color="inherit" component={Link} to="/profile">
              Profile
            </Button>

            <Button color="inherit" variant="outlined" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
