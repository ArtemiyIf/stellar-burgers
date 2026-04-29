import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { useSelector, useDispatch } from '../../services/store';
import { fetchOrderByNumber } from '../../services/slices/order-slice';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const dispatch = useDispatch();
  const { ingredients } = useSelector((state) => state.ingredients);
  const { viewedOrderData } = useSelector((state) => state.order);

  useEffect(() => {
    if (number) {
      dispatch(fetchOrderByNumber(parseInt(number)));
    }
  }, [number, dispatch]);

  const orderInfo = useMemo(() => {
    if (!viewedOrderData || !ingredients.length) return null;

    const date = new Date(viewedOrderData.createdAt);

    const ingredientsInfo = viewedOrderData.ingredients.reduce(
      (acc: Record<string, any>, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = { ...ingredient, count: 1 };
          }
        } else {
          acc[item].count++;
        }
        return acc;
      },
      {} as Record<string, any>
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return { ...viewedOrderData, ingredientsInfo, date, total };
  }, [viewedOrderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
