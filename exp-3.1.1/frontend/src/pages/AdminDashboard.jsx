// Experiment 3.1.3 — Admin-only dashboard with permission-controlled API call
import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Alert,
  CircularProgress,
  Grid,
  Paper,
} from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PeopleIcon from '@mui/icons-material/People';
import RouteIcon from '@mui/icons-material/AltRoute';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import api from '../utils/api';

const StatCard = ({ icon, label, value, color }) => (
  <Paper elevation={2} sx={{ p: 3, borderRadius: 3, textAlign: 'center' }}>
    <Box sx={{ color, mb: 1 }}>{icon}</Box>
    <Typography variant="h4" fontWeight={700}>
      {value}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {label}
    </Typography>
  </Paper>
);

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // this endpoint returns 403 if the logged-in user is not an admin
    api
      .get('/admin')
      .then((res) => setData(res.data))
      .catch((err) => setError(err.response?.data?.error || 'Access denied'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <AdminPanelSettingsIcon color="warning" fontSize="large" />
        <Typography variant="h4" fontWeight={700}>
          Admin Dashboard
        </Typography>
      </Box>

      {loading && <CircularProgress />}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {data && (
        <>
          <Alert severity="success" sx={{ mb: 3 }}>
            {data.message} — Role-based access granted.
          </Alert>

          {/* stats section showing permission-controlled data */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={4}>
              <StatCard
                icon={<PeopleIcon fontSize="large" />}
                label="Total Users"
                value={data.stats.totalUsers}
                color="primary.main"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <StatCard
                icon={<RouteIcon fontSize="large" />}
                label="Active Routes"
                value={data.stats.activeRoutes}
                color="secondary.main"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <StatCard
                icon={<CheckCircleIcon fontSize="large" />}
                label="Server Status"
                value={data.stats.serverStatus}
                color="success.main"
              />
            </Grid>
          </Grid>

          <Card elevation={3} sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Logged in as
              </Typography>
              <Typography>
                <strong>Username:</strong> {data.user.username}
              </Typography>
              <Typography>
                <strong>Role:</strong> {data.user.role}
              </Typography>
              <Typography>
                <strong>User ID:</strong> {data.user.id}
              </Typography>
            </CardContent>
          </Card>
        </>
      )}
    </Container>
  );
};

export default AdminDashboard;
