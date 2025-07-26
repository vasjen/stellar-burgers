import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { getIngredients } from '../../services/slices/ingredientsSlice';
import { TIngredient } from '@utils-types';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const ingredientId = String(useParams().id);
  const ingredientData =
    useSelector(getIngredients).find(
      (item: TIngredient) => item._id === ingredientId
    ) ?? null;
  if (!ingredientData) {
    return <Preloader />;
  }
  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
