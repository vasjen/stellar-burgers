import { FC, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../services/store';
import { useParams } from 'react-router-dom';
import {
  getOrderByNumber,
  getOrdersForView
} from '../../services/slices/feedsSlice';
import { getIngredients } from '../../services/slices/ingredientsSlice';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */
  const orderNumber = Number(useParams().number);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderByNumber(orderNumber));
  }, [dispatch]);
  const orderData = useSelector(getOrdersForView).find(
    (item) => item.number === orderNumber
  );
  const ingredients: TIngredient[] = useSelector(getIngredients);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };
    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            if (ingredient.type === 'bun') {
              acc[item] = {
                ...ingredient,
                count: 2
              };
            } else {
              acc[item] = {
                ...ingredient,
                count: 1
              };
            }
          }
        } else {
          acc[item].count++;
        }
        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
