import { Link as RouterLink} from 'react-router-dom'
import { Google } from '@mui/icons-material';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';



export const LoginPage = () => {
  return (
        <AuthLayout title='Login'>
          <form>
            <Grid container>
              <Grid item xs={12} sx={{ mt: 3}}>
                <TextField sx={{borderRadius: 10}}
                label= "correo" 
                type="email" 
                placeholder='correo@google.com'
                fullWidth
                />
              </Grid>

              <Grid item xs={12} sx={{ mt: 3}}>
                <TextField 
                label= "contraseña" 
                type="pasword" 
                placeholder='contraseña'
                fullWidth
                />
              </Grid>

              <Grid container spacing={ 2 } sx={{ mb:2, mt: 3}}>
                <Grid item xs={12} sm={6}>
                  <Button variant="contained" fullWidth>
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
