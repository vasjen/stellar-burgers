import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getOrdersApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

export const fetchUserOrders = createAsyncThunk('userOrders/fetch', async () =>
  getOrdersApi()
);

export interface UserOrdersState {
  userOrders: TOrder[];
  isUserOrdersLoading: boolean;
}

const initialState: UserOrdersState = {
  userOrders: [],
  isUserOrdersLoading: false
};

export const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {},
  selectors: {
    getUserOrders: (state) => state.userOrders
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.isUserOrdersLoading = true;
      })
      .addCase(fetchUserOrders.rejected, (state) => {
        state.isUserOrdersLoading = false;
      })
      .addCase(
        fetchUserOrders.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.isUserOrdersLoading = false;
          state.userOrders = action.payload;
        }
      );
  }
});

export const { getUserOrders } = userOrdersSlice.selectors;
export default userOrdersSlice.reducer;
