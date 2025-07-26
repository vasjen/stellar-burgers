import { FC, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../services/store';
import { TConstructorIngredient, TOrder } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  BurgerConstructorItems,
  completeOrder,
  getConstructorItems,
  getIsOrderProcessing,
  getOrderModalData,
  orderBurger
} from '../../services/slices/constructorSlice';
import { useNavigate, useLocation } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const constructorItems: BurgerConstructorItems =
    useSelector(getConstructorItems);
  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );
  const orderRequest = useSelector(getIsOrderProcessing);
  const orderModalData: TOrder | null = useSelector(getOrderModalData);
  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    const token = localStorage.getItem('refreshToken');
    if (!token) navigate('/login');
    else {
      const orderBun = constructorItems.bun!._id;
      const orderIngredients = constructorItems.ingredients.map(
        (item) => item._id
      );
      dispatch(orderBurger([orderBun, ...orderIngredients]));
    }
  };
  const closeOrderModal = () => {
    dispatch(completeOrder());
  };

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
