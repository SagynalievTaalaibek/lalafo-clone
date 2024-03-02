import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { createItems } from './itemsThunks';
import { ItemsMainWindow } from '../../types';

interface ItemsState {
  items: ItemsMainWindow[];
  createItemsLoading: boolean;
  fetchItemsLoading: boolean;
  deleteItemsLoading: boolean | string;
}

const initialState: ItemsState = {
  items: [],
  createItemsLoading: false,
  fetchItemsLoading: false,
  deleteItemsLoading: false,
};

export const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createItems.pending, (state) => {
        state.createItemsLoading = true;
      })
      .addCase(createItems.fulfilled, (state) => {
        state.createItemsLoading = false;
      })
      .addCase(createItems.rejected, (state) => {
        state.createItemsLoading = false;
      });
  },
});

export const itemReducer = itemSlice.reducer;
export const selectItems = (state: RootState) => state.items.items;
export const selectItemsFetchLoading = (state: RootState) =>
  state.items.fetchItemsLoading;
export const selectItemsCreateLoading = (state: RootState) =>
  state.items.createItemsLoading;
export const selectItemsDeleteLoading = (state: RootState) =>
  state.items.deleteItemsLoading;
