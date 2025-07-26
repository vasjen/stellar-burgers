import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../services/store';
import { fetchFeeds, getOrders } from '../../services/slices/feedsSlice';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC } from 'react';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch: AppDispatch = useDispatch();
  const orders = useSelector(getOrders);
  const handleGetFeeds = () => dispatch(fetchFeeds());
  if (!orders.length) {
    return <Preloader />;
  }
  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
