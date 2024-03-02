import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchCategory } from './categoriesThunks';
import { CategoryI } from '../../types';

interface CategoriesState {
  category: CategoryI[];
  fetchLoading: boolean;
}

const initialState: CategoriesState = {
  category: [],
  fetchLoading: false,
};

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchCategory.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
        state.category = payload;
      })
      .addCase(fetchCategory.rejected, (state) => {
        state.fetchLoading = false;
      });
  },
});

export const categoryReducer = categorySlice.reducer;
export const selectCategory = (state: RootState) => state.categories.category;
export const selectFetchCategoryLoading = (state: RootState) =>
  state.categories.fetchLoading;
