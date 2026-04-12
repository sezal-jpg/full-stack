// Experiment 3.1.2 & 3.1.3 — Protected profile page showing session details
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Alert,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from '../context/AuthContext';

const UserProfile = () => {
  const { user, token } = useAuth();

  // truncate the token so it's readable but not overflowing
  const shortToken = token ? `${token.slice(0, 40)}...` : '';

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <AccountCircleIcon color="primary" fontSize="large" />
        <Typography variant="h4" fontWeight={700}>
          User Profile
        </Typography>
      </Box>

      <Card elevation={3} sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <AccountCircleIcon sx={{ fontSize: 60, color: 'primary.main' }} />
            <Box>
              <Typography variant="h5" fontWeight={700}>
                {user?.username}
              </Typography>
              <Chip
                label={user?.role}
                color={user?.role === 'admin' ? 'warning' : 'primary'}
                size="small"
                sx={{ mt: 0.5 }}
              />
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Session Info
          </Typography>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            <strong>Role:</strong> {user?.role}
          </Typography>

          {/* show stored JWT to demonstrate Exp 3.1.2 localStorage requirement */}
          <Typography variant="body2" color="text.secondary" gutterBottom>
            <strong>JWT (localStorage):</strong>
          </Typography>
          <Box
            sx={{
              backgroundColor: '#f5f5f5',
              p: 1.5,
              borderRadius: 2,
              wordBreak: 'break-all',
              fontFamily: 'monospace',
              fontSize: '0.72rem',
              mb: 2,
            }}
          >
            {shortToken}
          </Box>

          <Alert severity="info">
            Token is stored in localStorage and attached to every API request automatically.
          </Alert>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UserProfile;
