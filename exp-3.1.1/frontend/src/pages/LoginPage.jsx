// Experiment 3.1.1 — Login form with React Hook Form validation and MUI
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, Navigate } from 'react-router-dom';
import api from '../utils/api';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
  Alert,
  Paper,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { login, isAuth } = useAuth();
  const navigate = useNavigate();

  // local state for loading spinner and server feedback
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // initialize React Hook Form with validation rules
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { username: '', password: '' },
  });

  // redirect already-authenticated users
  if (isAuth) return <Navigate to="/dashboard" replace />;

  const onSubmit = async (data) => {
    setLoading(true);
    setServerError('');
    setSuccessMsg('');

    try {
      const res = await api.post('/auth/login', data);
      const { token, role, username, message } = res.data;

      setSuccessMsg(message);

      // give user a moment to read the success message before redirect
      setTimeout(() => {
        login(token, { username, role });
        navigate('/dashboard');
      }, 800);
    } catch (err) {
      // show the server's error message (e.g. "Invalid credentials")
      setServerError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={4} sx={{ p: 4, width: '100%', borderRadius: 3 }}>
          {/* lock icon header */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Box
              sx={{
                backgroundColor: 'primary.main',
                borderRadius: '50%',
                p: 1.5,
                color: 'white',
              }}
            >
              <LockOutlinedIcon />
            </Box>
          </Box>

          <Typography variant="h5" align="center" fontWeight={700} mb={3}>
            Sign In
          </Typography>

          {/* success alert (Exp 3.1.1 — success feedback) */}
          {successMsg && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {successMsg}
            </Alert>
          )}

          {/* error alert (Exp 3.1.1 — error feedback) */}
          {serverError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {serverError}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* controlled username field with validation */}
            <Controller
              name="username"
              control={control}
              rules={{ required: 'Username is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Username"
                  fullWidth
                  margin="normal"
                  error={!!errors.username}
                  helperText={errors.username?.message}
                  autoFocus
                />
              )}
            />

            {/* controlled password field with min length check */}
            <Controller
              name="password"
              control={control}
              rules={{
                required: 'Password is required',
                minLength: { value: 6, message: 'Minimum 6 characters' },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />

            {/* submit button shows spinner while loading (Exp 3.1.1) */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mt: 3, mb: 2, py: 1.4, fontWeight: 700 }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
            </Button>

            <Typography variant="body2" color="text.secondary" align="center">
              Demo: <strong>admin / admin123</strong> or <strong>user / user123</strong>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginPage;
