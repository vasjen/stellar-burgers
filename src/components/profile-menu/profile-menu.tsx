import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../services/store';
import { ProfileMenuUI } from '@ui';
import { logoutUser } from '../../services/slices/userInfoSlice';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
