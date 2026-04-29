import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import { clearConstructor } from '../../services/slices/constructor-slice';
import { createOrder, clearNewOrder } from '../../services/slices/order-slice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = useSelector((state) => state.constructorBurger);
  const { newOrderData, orderRequest } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user) {
      navigate('/login');
      return;
    }

    const ingredients = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];

    dispatch(createOrder(ingredients)).then((action) => {
      if (createOrder.fulfilled.match(action)) {
        dispatch(clearConstructor());
      }
    });
  };

  const closeOrderModal = () => {
    dispatch(clearNewOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={newOrderData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
