import { FC } from 'react';
import { useSelector } from 'react-redux';
import { getFeeds } from '../../services/slices/feedsSlice';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';

const getOrdersByStatus = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  /** TODO: взять переменные из стора */
  const feed = useSelector(getFeeds);
  const orders = feed.orders;
  const total = feed.total;
  const totalToday = feed.totalToday;
  const feedInfo = { total, totalToday };
  const readyOrders = getOrdersByStatus(orders, 'done');
  const pendingOrders = getOrdersByStatus(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feedInfo}
    />
  );
};
