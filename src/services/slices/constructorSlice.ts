import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient, TOrder } from '../../utils/types';
import { orderBurgerApi } from '@api';

export const orderBurger = createAsyncThunk(
  'burgerConstructor',
  async (orderCompound: string[]) => orderBurgerApi(orderCompound)
);

export interface BurgerConstructorItems {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
}

export interface BurgerConstructorState {
  constructorItems: BurgerConstructorItems;
  price: number;
  isOrderProcessing: boolean;
  orderModalData: TOrder | null;
}

const initialState: BurgerConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  price: 0,
  isOrderProcessing: false,
  orderModalData: null
};

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient(state, action: PayloadAction<TIngredient>) {
      if (action.payload.type === 'bun') {
        state.constructorItems.bun = action.payload;
      } else {
        const newItem: TIngredient = action.payload;
        const newItemWithId: TConstructorIngredient = {
          ...newItem,
          id: String(Math.floor(Math.random() * 1000))
        };
        state.constructorItems.ingredients.push(newItemWithId);
      }
    },
    deleteIngredient(state, action: PayloadAction<TConstructorIngredient>) {
      if (action.payload.type === 'bun') return;
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload.id
        );
    },
    completeOrder(state) {
      state.orderModalData = null;
    }
  },
  selectors: {
    getConstructorItems: (state) => state.constructorItems,
    getIsOrderProcessing: (state) => state.isOrderProcessing,
    getOrderModalData: (state) => state.orderModalData
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.isOrderProcessing = true;
      })
      .addCase(orderBurger.rejected, (state) => {
        state.isOrderProcessing = false;
      })
      .addCase(
        orderBurger.fulfilled,
        (
          state,
          action: PayloadAction<{
            order: TOrder;
            name: string;
          }>
        ) => {
          state.isOrderProcessing = false;
          state.orderModalData = action.payload.order;
          state.constructorItems.bun = null;
          state.constructorItems.ingredients = [];
          state.price = 0;
        }
      );
  }
});

export const { getConstructorItems, getOrderModalData, getIsOrderProcessing } =
  constructorSlice.selectors;

export const { addIngredient, deleteIngredient, completeOrder } =
  constructorSlice.actions;
export default constructorSlice.reducer;
