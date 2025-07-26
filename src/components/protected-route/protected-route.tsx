import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import {
  getCheckResult,
  getUserData
} from '../../services/slices/userInfoSlice';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const location = useLocation();
  const isUserChecked = useSelector(getCheckResult);
  const userData = useSelector(getUserData);
  if (!isUserChecked) return <Preloader />;
  if (!userData && !onlyUnAuth) {
    return <Navigate to='/login' state={{ from: location }} />;
  }
  if (userData && onlyUnAuth) {
    const from = location.state?.from || { pathname: '/' };
    const background = { background: from?.state?.background };
    return <Navigate replace to={from} state={background} />;
  }
  return children;
};
