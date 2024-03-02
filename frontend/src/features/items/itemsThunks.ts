import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import axiosApi from '../../axiosApi';
import { ItemMutation } from '../../types';

export const createItems = createAsyncThunk<
  void,
  ItemMutation,
  { state: RootState }
>('items/create', async (itemData, { getState }) => {
  const token = getState().users.user?.token;

  await axiosApi.post('/items', itemData, {
    headers: { Authorization: 'Bearer ' + token },
  });
});
