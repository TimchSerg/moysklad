import { Navigate, useLocation } from 'react-router-dom'
import Main from './main';
import { useAuth } from 'hooks/useAuth';

export function PrivateOutlet() {
  const auth = useAuth()
  const location = useLocation()

  return auth.isAuth ? (
    <Main />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  )
}