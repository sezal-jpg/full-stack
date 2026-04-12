// Experiment 3.1.2 — Protected dashboard accessible by any authenticated user
import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Alert,
  CircularProgress,
  Chip,
} from '@mui/material';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch protected endpoint to confirm JWT is accepted by the server
    api
      .get('/protected')
      .then((res) => setData(res.data))
      .catch(() => setError('Failed to load dashboard data'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <VerifiedUserIcon color="primary" fontSize="large" />
        <Typography variant="h4" fontWeight={700}>
          Dashboard
        </Typography>
      </Box>

      {loading && <CircularProgress />}

      {error && <Alert severity="error">{error}</Alert>}

      {data && (
        <Card elevation={3} sx={{ borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              {data.message}
            </Typography>
            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography>
                <strong>Username:</strong> {data.user.username}
              </Typography>
              <Typography>
                <strong>Role:</strong>{' '}
                <Chip
                  label={data.user.role}
                  color={data.user.role === 'admin' ? 'warning' : 'primary'}
                  size="small"
                />
              </Typography>
              <Typography>
                <strong>User ID:</strong> {data.user.id}
              </Typography>
              <Alert severity="success" sx={{ mt: 2 }}>
                JWT verified on server — you have access to this protected route.
              </Alert>
            </Box>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default Dashboard;
