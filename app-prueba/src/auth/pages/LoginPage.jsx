import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { Google } from '@mui/icons-material'; // Importa el icono de Google
import axios from 'axios';
import { useState } from 'react';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/user/login/', {
        email,
        password,
      });
      console.log(response)
      const token = response.data.data.token;
      // Guarda el token en el almacenamiento local o en las cookies
      localStorage.setItem('token', token);
      console.log('Login exitoso');
      // Redirige a la página de inicio si las credenciales son correctas
      window.location.href = '/';
    } catch (error) {
      console.error('Error al iniciar sesión:', error.response.data.error);
      // Muestra un mensaje de error si las credenciales son incorrectas
      setError('Credenciales incorrectas. Por favor, inténtelo de nuevo.');
    }
  };

  
  return (
    <AuthLayout title='Login'>
      <form>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 3 }}>
            <TextField
              sx={{ borderRadius: 10 }}
              label="correo"
              type="email"
              placeholder='correo@google.com'
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 3 }}>
            <TextField
              label="contraseña"
              type="password"
              placeholder='contraseña'
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>

          {error && (
            <Grid item xs={12} sx={{ mt: 3 }}>
              <Typography color="error">{error}</Typography>
            </Grid>
          )}

          <Grid container spacing={2} sx={{ mb: 2, mt: 3 }}>
            <Grid item xs={12} sm={6}>
              <Button variant="contained" fullWidth onClick={handleLogin}>
                login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="contained" fullWidth>
                <Google /> {/* Utiliza el icono de Google */}
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction='row' justifyContent="end">
            <RouterLink to="/auth/register" style={{ textDecoration: 'none' }}>
              <Button variant="text">
                Crear una cuenta
              </Button>
            </RouterLink>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>
  );
};
