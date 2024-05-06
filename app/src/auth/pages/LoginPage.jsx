import { Link as RouterLink} from 'react-router-dom'
import { Google } from '@mui/icons-material';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import LoginEndPoint from './LoginEndPoint';
import React, { useState } from 'react';



export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const userData = LoginEndPoint.getUserData();
    const user = userData.data.find(u => u.email === email && u.hash === password);
    if (user) {
      console.log('Usuario válido:', user.name);
    } else {
      console.log('Credenciales inválidas');
    }
  }

  return (
        <AuthLayout title='Login'>
          <LoginEndPoint /> 
          <form>
            <Grid container>
              <Grid item xs={12} sx={{ mt: 3}}>
                <TextField sx={{borderRadius: 10}}
                label= "correo" 
                type="email" 
                placeholder='correo@google.com'
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sx={{ mt: 3}}>
                <TextField 
                label= "contraseña" 
                type="pasword" 
                placeholder='contraseña'
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>

              <Grid container spacing={ 2 } sx={{ mb:2, mt: 3}}>
                <Grid item xs={12} sm={6}>
                  <Button variant="contained" fullWidth onClick={handleLogin}>
                    login
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button variant="contained" fullWidth>
                    <Google/>
                    <Typography sx={{ ml:1}}>Google</Typography>
                  </Button>
                </Grid>
              </Grid>

              <Grid container direction='row' justifyContent="end">
                <Link component={RouterLink} to="/auth/register">
                  Crear una cuenta
                </Link>
              </Grid>

            </Grid>
          </form>

        </AuthLayout>      
  )

}
