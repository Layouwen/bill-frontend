import { useAppSelector } from '@/store/hooks';
import { Navigate, useLocation } from 'react-router-dom';

const LoginGuard = ({ children }: { children: JSX.Element }) => {
  const token = useAppSelector((state) => state.user.token);
  const location = useLocation();
  if (token) return children;
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default LoginGuard;
