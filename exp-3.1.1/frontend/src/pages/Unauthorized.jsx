// Experiment 3.1.3 — Shown when a user tries to access a route beyond their role
import { Container, Typography, Box, Button, Paper } from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper elevation={4} sx={{ p: 5, borderRadius: 3, textAlign: 'center' }}>
        <BlockIcon sx={{ fontSize: 70, color: 'error.main', mb: 2 }} />

        <Typography variant="h4" fontWeight={700} color="error" gutterBottom>
          Access Denied
        </Typography>

        <Typography variant="body1" color="text.secondary" mb={4}>
          You do not have permission to view this page. This area is restricted to admins only.
        </Typography>

        {/* role-based links mentioned in Exp 3.1.3 expected output */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Admin Dashboard — <em>Restricted</em>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            User Profile — <em>Available</em>
          </Typography>
        </Box>

        <Button variant="contained" onClick={() => navigate('/dashboard')}>
          Go to Dashboard
        </Button>
      </Paper>
    </Container>
  );
};

export default Unauthorized;
