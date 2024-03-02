import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { GlobalError, User, ValidationError } from '../../types';
import { register } from './usersThunks';

interface UsersState {
  user: User | null;
  registerLoading: boolean;
  registerError: ValidationError | null;
  loginLoading: boolean;
  loginError: GlobalError | null;
}

const initialState: UsersState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.registerLoading = true;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.registerLoading = false;
        state.user = payload.user;
      })
      .addCase(register.pending, (state, { payload: error }) => {
        state.registerLoading = false;
        state.registerError = error || null;
      });
  },
});

export const usersReducer = usersSlice.reducer;
export const selectUser = (state: RootState) => state.users.user;
export const selectRegisterLoading = (state: RootState) =>
  state.users.registerLoading;
export const selectRegisterError = (state: RootState) =>
  state.users.registerError;
export const selectLoginLoading = (state: RootState) =>
  state.users.loginLoading;
export const selectLoginError = (state: RootState) => state.users.loginError;
