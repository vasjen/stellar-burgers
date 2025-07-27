import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';
import { TIngredient } from '../../utils/types';

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetch',
  async () => getIngredientsApi()
);

export interface BurgerIngrediantsState {
  ingredientsList: TIngredient[];
  isIngredientsLoading: boolean;
}

const initialState: BurgerIngrediantsState = {
  ingredientsList: [],
  isIngredientsLoading: true
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredients: (state) => state.ingredientsList,
    getIsIngredientsLoading: (state) => state.isIngredientsLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isIngredientsLoading = true;
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.isIngredientsLoading = false;
      })
      .addCase(
        fetchIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.isIngredientsLoading = false;
          state.ingredientsList = action.payload;
        }
      );
  }
});

export const { getIngredients, getIsIngredientsLoading } =
  ingredientsSlice.selectors;
export default ingredientsSlice.reducer;
