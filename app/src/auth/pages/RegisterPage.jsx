import { Link as RouterLink} from 'react-router-dom'
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';





export const RegisterPage = () => {
  return (
        <AuthLayout title='Registro'>
          <form>
            <Grid container>

            <Grid item xs={12} sx={{ mt: 3}}>
                <TextField 
                label= "Nombre completo" 
                type="text" 
                placeholder='Juan Perez'
                fullWidth
                />
              </Grid>


              <Grid item xs={12} sx={{ mt: 3}}>
                <TextField 
                label= "Correo" 
                type="email" 
                placeholder='correo@google.com'
                fullWidth
                />
              </Grid>

              <Grid item xs={12} sx={{ mt: 3}}>
                <TextField 
                label= "Contraseña" 
                type="pasword" 
                placeholder='Ingrese contraseña'
                fullWidth
                />
              </Grid>
              <Grid item xs={12} sx={{ mt: 3}}>
                <TextField 
                label= "Confirmar contraseña" 
                type="pasword" 
                placeholder='Ingrese contraseña'
                fullWidth
                />
              </Grid>

              <Grid container spacing={ 2 } sx={{ mb:2, mt: 3}}>
                <Grid item xs={12} >
                  <Button variant="contained" fullWidth>
                    Crear cuenta
                  </Button>
                </Grid>
              
              </Grid>

              <Grid container direction='row' justifyContent="end">
                <Typography sx={{ mr: 1}}>¿Ya tienes una cuenta?</Typography>
                <Link component={RouterLink} to="/auth/login">
                  Ingresar
                </Link>
              </Grid>

            </Grid>
          </form>

        </AuthLayout>      
  )
}

