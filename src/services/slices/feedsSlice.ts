import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getFeedsApi, getOrderByNumberApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

export const fetchFeeds = createAsyncThunk('feeds/fetch', async () =>
  getFeedsApi()
);

export const getOrderByNumber = createAsyncThunk(
  'feeds/getOrder',
  async (orderNumber: number) => getOrderByNumberApi(orderNumber)
);

interface TFeeds {
  orders: TOrder[];
  total: number;
  totalToday: number;
}
interface TOrderByNumber {
  orders: TOrder[];
}

export interface BurgerFeedsState {
  feeds: TFeeds;
  isFeedsLoading: boolean;
  orderForView: TOrderByNumber;
  isOrderLoading: boolean;
}

const initialState: BurgerFeedsState = {
  feeds: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  isFeedsLoading: false,
  orderForView: {
    orders: []
  },
  isOrderLoading: false
};

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    getFeeds: (state) => state.feeds,
    getOrders: (state) => state.feeds.orders,
    getOrdersForView: (state) => state.orderForView.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isFeedsLoading = true;
      })
      .addCase(fetchFeeds.rejected, (state) => {
        state.isFeedsLoading = false;
      })
      .addCase(fetchFeeds.fulfilled, (state, action: PayloadAction<TFeeds>) => {
        state.isFeedsLoading = false;
        state.feeds = action.payload;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(getOrderByNumber.rejected, (state) => {
        state.isOrderLoading = false;
      })
      .addCase(
        getOrderByNumber.fulfilled,
        (state, action: PayloadAction<TOrderByNumber>) => {
          state.isOrderLoading = false;
          state.orderForView = action.payload;
        }
      );
  }
});

export const { getFeeds, getOrders, getOrdersForView } = feedsSlice.selectors;
export default feedsSlice.reducer;
