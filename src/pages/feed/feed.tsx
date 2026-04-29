import { useEffect } from 'react';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { fetchFeeds } from '../../services/slices/feed-slice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector((state) => state.feed);

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(fetchFeeds());
  };

  if (isLoading || !orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
