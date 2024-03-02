import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { createItems, fetchItems } from './itemsThunks';
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
    builder
      .addCase(fetchItems.pending, (state) => {
        state.fetchItemsLoading = true;
      })
      .addCase(fetchItems.fulfilled, (state, { payload }) => {
        state.fetchItemsLoading = false;
        state.items = payload;
      })
      .addCase(fetchItems.rejected, (state) => {
        state.fetchItemsLoading = false;
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
