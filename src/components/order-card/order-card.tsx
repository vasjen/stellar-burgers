import { FC, memo, useMemo } from 'react';
import { useLocation, Location } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIngredients } from '../../services/slices/ingredientsSlice';
import { OrderCardProps } from './type';
import { TIngredient } from '@utils-types';
import { OrderCardUI } from '../ui/order-card';

const maxIngredients = 6;

export const OrderCard: FC<OrderCardProps> = memo(({ order }) => {
  const location: Location<{ background: Location }> = useLocation();

  /** TODO: взять переменную из стора */
  const ingredients: TIngredient[] = useSelector(getIngredients);
  const orderInfo = useMemo(() => {
    if (!ingredients.length) return null;

    let ingredientsInfo = order.ingredients.reduce(
      (acc: TIngredient[], item: string) => {
        const ingredient = ingredients.find((ing) => ing._id === item);
        if (ingredient) return [...acc, ingredient];
        return acc;
      },
      []
    );
    //  для корректного подсчета стоимости бургера надо булочку посчитать 2 раза
    const ingredientsBun = ingredientsInfo.find((item) => item.type === 'bun');
    if (ingredientsBun) {
      ingredientsInfo = ingredientsInfo.concat(ingredientsBun);
    }
    const total = ingredientsInfo.reduce((acc, item) => acc + item.price, 0);

    const ingredientsToShow = ingredientsInfo.slice(0, maxIngredients);

    const remains =
      ingredientsInfo.length > maxIngredients
        ? ingredientsInfo.length - maxIngredients
        : 0;

    const date = new Date(order.createdAt);
    return {
      ...order,
      ingredientsInfo,
      ingredientsToShow,
      remains,
      total,
      date
    };
  }, [order, ingredients]);

  if (!orderInfo) return null;

  return (
    <OrderCardUI
      orderInfo={orderInfo}
      maxIngredients={maxIngredients}
      locationState={{ background: location }}
    />
  );
});
