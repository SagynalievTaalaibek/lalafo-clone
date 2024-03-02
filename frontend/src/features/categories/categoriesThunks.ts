import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { CategoryI } from '../../types';

export const fetchCategory = createAsyncThunk<CategoryI[]>(
  'category/fetchAll',
  async () => {
    const response = await axiosApi.get<CategoryI[]>('/categories');
    return response.data;
  },
);
