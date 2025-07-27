import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { ingredientsSlice } from './slices/ingredientsSlice';
import { constructorSlice } from './slices/constructorSlice';
import { feedsSlice } from './slices/feedsSlice';
import { userInfoSlice } from './slices/userInfoSlice';
import { userOrdersSlice } from './slices/userOrdersSlice';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [constructorSlice.name]: constructorSlice.reducer,
  [feedsSlice.name]: feedsSlice.reducer,
  [userInfoSlice.name]: userInfoSlice.reducer,
  [userOrdersSlice.name]: userOrdersSlice.reducer
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
