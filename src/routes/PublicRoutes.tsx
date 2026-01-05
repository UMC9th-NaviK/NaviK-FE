import { Navigate, Outlet } from 'react-router-dom';

export default function PublicRoutes() {
  const token = localStorage.getItem('accessToken');
  const isLoggedIn = Boolean(token);

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
