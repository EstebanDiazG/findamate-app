import { Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { JournalRoutes } from '../journal/routes/JournalRoutes'

export const AppRouter = () => {
  return (
    <Routes>
        {/* ruta de login y registro */}
        <Route path="/auth/*" element={ <AuthRoutes/> }/>

        {/* ruta de pagina principal-Home */}
        <Route path="/*" element={ <JournalRoutes/> }/>
       
    </Routes>
  )
}

