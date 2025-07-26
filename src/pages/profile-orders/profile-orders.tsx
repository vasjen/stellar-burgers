import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../services/store';
import {
  fetchUserOrders,
  getUserOrders
} from '../../services/slices/userOrdersSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);
  const userOrders: TOrder[] = useSelector(getUserOrders);

  return <ProfileOrdersUI orders={userOrders} />;
};
