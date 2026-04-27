import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  loginUserApi,
  registerUserApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  TRegisterData,
  TLoginData
} from '@api';
import { TUser } from '@utils-types';
import { setCookie, deleteCookie, getCookie } from '../../utils/cookie';

interface UserState {
  user: TUser | null;
  isAuthChecked: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  isAuthChecked: false,
  isLoading: false,
  error: null
};

export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => {
    const res = await registerUserApi(data);
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => {
    const res = await loginUserApi(data);
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);

export const fetchUser = createAsyncThunk('user/fetch', async () => {
  const res = await getUserApi();
  return res.user;
});

export const updateUser = createAsyncThunk(
  'user/update',
  async (data: Partial<TRegisterData>) => {
    const res = await updateUserApi(data);
    return res.user;
  }
);

export const logoutUser = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  localStorage.removeItem('refreshToken');
  deleteCookie('accessToken');
});

export const checkUserAuth = createAsyncThunk(
  'user/checkAuth',
  async (_, { dispatch }) => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      await dispatch(fetchUser());
    } else {
      dispatch(setAuthChecked());
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (s) => {
        s.isLoading = true;
        s.error = null;
      })
      .addCase(registerUser.fulfilled, (s, a) => {
        s.isLoading = false;
        s.user = a.payload;
        s.isAuthChecked = true;
      })
      .addCase(registerUser.rejected, (s, a) => {
        s.isLoading = false;
        s.error = a.error.message || 'Ошибка';
      })
      .addCase(loginUser.pending, (s) => {
        s.isLoading = true;
        s.error = null;
      })
      .addCase(loginUser.fulfilled, (s, a) => {
        s.isLoading = false;
        s.user = a.payload;
        s.isAuthChecked = true;
      })
      .addCase(loginUser.rejected, (s, a) => {
        s.isLoading = false;
        s.error = a.error.message || 'Ошибка';
      })
      .addCase(fetchUser.pending, (s) => {
        s.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (s, a) => {
        s.isLoading = false;
        s.user = a.payload;
        s.isAuthChecked = true;
      })
      .addCase(fetchUser.rejected, (s) => {
        s.isLoading = false;
        s.isAuthChecked = true;
      })
      .addCase(updateUser.pending, (s) => {
        s.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (s, a) => {
        s.isLoading = false;
        s.user = a.payload;
      })
      .addCase(updateUser.rejected, (s) => {
        s.isLoading = false;
      })
      .addCase(logoutUser.fulfilled, (s) => {
        s.user = null;
        s.isAuthChecked = false;
      });
  }
});

export const { setAuthChecked } = userSlice.actions;
export default userSlice.reducer;
