import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';

type LoginGuardProps = {
  children: JSX.Element;
};

const LoginGuard: FC<LoginGuardProps> = ({ children }) => {
  const token = useAppSelector((state) => state.user.token);
  const location = useLocation();
  if (token) return children;
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default LoginGuard;
