import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function ProtectedRoutes() {
  const location = useLocation();

  const token = localStorage.getItem('accessToken');
  const isLoggedIn = Boolean(token);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
