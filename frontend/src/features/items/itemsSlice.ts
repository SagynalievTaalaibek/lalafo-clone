import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
  createItems,
  deleteItem,
  fetchItems,
  fetchOneItem,
} from './itemsThunks';
import { ItemsMainWindow, OneItemI } from '../../types';

interface ItemsState {
  items: ItemsMainWindow[];
  oneItem: OneItemI | null;
  createItemsLoading: boolean;
  fetchItemsLoading: boolean;
  fetchOneItemLoading: boolean;
  deleteItemsLoading: boolean;
}

const initialState: ItemsState = {
  items: [],
  oneItem: null,
  createItemsLoading: false,
  fetchItemsLoading: false,
  fetchOneItemLoading: false,
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
    builder
      .addCase(fetchOneItem.pending, (state) => {
        state.fetchOneItemLoading = true;
      })
      .addCase(fetchOneItem.fulfilled, (state, { payload }) => {
        state.fetchOneItemLoading = false;
        state.oneItem = payload;
      })
      .addCase(fetchOneItem.rejected, (state) => {
        state.fetchOneItemLoading = false;
      });
    builder
      .addCase(deleteItem.pending, (state) => {
        state.deleteItemsLoading = true;
      })
      .addCase(deleteItem.fulfilled, (state) => {
        state.deleteItemsLoading = false;
      })
      .addCase(deleteItem.rejected, (state) => {
        state.deleteItemsLoading = false;
      });
  },
});

export const itemReducer = itemSlice.reducer;
export const selectItems = (state: RootState) => state.items.items;
export const selectOneItem = (state: RootState) => state.items.oneItem;
export const selectItemsFetchLoading = (state: RootState) =>
  state.items.fetchItemsLoading;
export const selectItemsCreateLoading = (state: RootState) =>
  state.items.createItemsLoading;
export const selectItemsDeleteLoading = (state: RootState) =>
  state.items.deleteItemsLoading;
export const selectFetchOneItemLoading = (state: RootState) =>
  state.items.fetchOneItemLoading;
