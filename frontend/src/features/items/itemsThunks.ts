import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import axiosApi from '../../axiosApi';
import { ItemMutation, ItemsMainWindow, OneItemI } from '../../types';

export const createItems = createAsyncThunk<
  void,
  ItemMutation,
  { state: RootState }
>('items/create', async (itemData, { getState }) => {
  const token = getState().users.user?.token;

  const formData = new FormData();

  const keys = Object.keys(itemData) as (keyof ItemMutation)[];
  keys.forEach((key) => {
    const value = itemData[key];

    if (value !== null) {
      formData.append(key, value);
    }
  });

  await axiosApi.post('/items', formData, {
    headers: { Authorization: 'Bearer ' + token },
  });
});

export const fetchItems = createAsyncThunk<ItemsMainWindow[], string>(
  'items/fetchAll',
  async (id) => {
    const response = await axiosApi.get<ItemsMainWindow[]>(
      `/items/?category=${id}`,
    );
    return response.data;
  },
);

export const fetchOneItem = createAsyncThunk<OneItemI, string>(
  'item/fetchOne',
  async (id) => {
    const response = await axiosApi.get<OneItemI>(`/items/${id}`);
    return response.data;
  },
);

export const deleteItem = createAsyncThunk<void, string>(
  'item/delete',
  async (id) => {
    await axiosApi.delete(`/items/${id}`);
  },
);
