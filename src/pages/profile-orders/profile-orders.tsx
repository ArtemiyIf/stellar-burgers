import { useEffect } from 'react';
import { ProfileOrdersUI } from '@ui-pages';
import { FC } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { fetchUserOrders } from '../../services/slices/feed-slice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.feed.orders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
