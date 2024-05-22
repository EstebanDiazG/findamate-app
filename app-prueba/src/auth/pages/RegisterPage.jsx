import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import axios from 'axios';

export const RegisterPage = () => {
  const [name, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [hash, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = async () => {
    if (hash !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/user/', {
        name,
        email,
        hash,
      });
      console.log(response);
      console.log('Registro exitoso');
      setIsRegistered(true);
    } catch (error) {
      console.error('Error al registrar:', error.response.data.error);
      setError('Error al registrar. Por favor, inténtelo de nuevo.');
    }
  };

  if (isRegistered) {
    // Si el usuario está registrado, redirigir al inicio de sesión
    return (
      <AuthLayout title='Registro exitoso'>
        <Typography variant="h4" gutterBottom>
          ¡Registro exitoso!
        </Typography>
        <Typography variant="body1" paragraph>
          Por favor, inicia sesión para continuar.
        </Typography>
        <Button component={RouterLink} to="/auth/login" variant="contained">
          Iniciar sesión
        </Button>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title='Registro'>
      <form>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 3 }}>
            <TextField
              label="Nombre completo"
              type="text"
              placeholder='Juan Perez'
              fullWidth
              value={name}
              onChange={(e) => setFullName(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 3 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder='correo@google.com'
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 3 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder='Ingrese contraseña'
              fullWidth
              value={hash}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 3 }}>
            <TextField
              label="Confirmar contraseña"
              type="password"
              placeholder='Ingrese contraseña'
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Grid>

          {error && (
            <Grid item xs={12} sx={{ mt: 3 }}>
              <Typography color="error">{error}</Typography>
            </Grid>
          )}

          <Grid container spacing={2} sx={{ mb: 2, mt: 3 }}>
            <Grid item xs={12}>
              <Button variant="contained" fullWidth onClick={handleRegister}>
                Crear cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid container direction='row' justifyContent="end">
            <Typography sx={{ mr: 1 }}>¿Ya tienes una cuenta?</Typography>
            <Button component={RouterLink} to="/auth/login" variant="text">
              Ingresar
            </Button>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};

