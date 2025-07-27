import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  TAuthResponse
} from '../../utils/burger-api';
import { setCookie, deleteCookie } from '../../utils/cookie';

type TRegisterData = {
  name: string;
  email: string;
  password: string;
};

export const registerUser = createAsyncThunk(
  'userInfo/register',
  async (userData: TRegisterData, { rejectWithValue }) => {
    const data = await registerUserApi(userData);
    if (!data?.success) return rejectWithValue(data);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const loginUser = createAsyncThunk(
  'userInfo/login',
  async (
    { email, password }: Pick<TRegisterData, 'email' | 'password'>,
    { rejectWithValue }
  ) => {
    const data = await loginUserApi({ email, password });
    if (!data?.success) return rejectWithValue(data);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const updateUserData = createAsyncThunk(
  'userInfo/update',
  async ({ email, name, password }: TRegisterData) =>
    updateUserApi({ email, name, password })
);

export const getUser = createAsyncThunk('userInfo/getUser', async () =>
  getUserApi()
);

export const logoutUser = createAsyncThunk('userInfo/logout', async () => {
  const data = await logoutApi();
  if (data.success) {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  }
});

type TUserData = Pick<TAuthResponse, 'user'>;

export interface TUserInfo {
  userData: TUserData | null;
  isFetching: boolean;
  isUserChecked: boolean;
}

const initialState: TUserInfo = {
  userData: null,
  isFetching: false,
  isUserChecked: false
};

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    userChecked(state) {
      state.isUserChecked = true;
    }
  },
  selectors: {
    getCheckResult: (state) => state.isUserChecked,
    getUserData: (state) => state.userData
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<TUserData>) => {
          state.isFetching = false;
          state.userData = action.payload;
        }
      )
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<TUserData>) => {
          state.isFetching = false;
          state.userData = action.payload;
        }
      )
      .addCase(
        updateUserData.fulfilled,
        (state, action: PayloadAction<TUserData>) => {
          state.isFetching = false;
          state.userData = action.payload;
        }
      )
      .addCase(getUser.fulfilled, (state, action: PayloadAction<TUserData>) => {
        state.isFetching = false;
        state.userData = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isFetching = false;
        state.userData = null;
      })
      .addMatcher(
        (action) =>
          action.type.endsWith('pending') && action.type.startsWith('userInfo'),
        (state) => {
          state.isFetching = true;
        }
      )
      .addMatcher(
        (action) =>
          action.type.endsWith('rejected') &&
          action.type.startsWith('userInfo'),
        (state) => {
          state.isFetching = false;
        }
      );
  }
});

export const { getCheckResult, getUserData } = userInfoSlice.selectors;
export const { userChecked } = userInfoSlice.actions;
export default userInfoSlice.reducer;
