import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import axiosApi from '../../axiosApi';
import {
  RegisterMutation,
  RegisterResponse,
  ValidationError,
} from '../../types';

export const register = createAsyncThunk<
  RegisterResponse,
  RegisterMutation,
  { rejectValue: ValidationError }
>('user/register', async (userData, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post('/users', userData);
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 422) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});
