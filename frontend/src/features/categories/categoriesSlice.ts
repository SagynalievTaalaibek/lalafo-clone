import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchCategory } from './categoriesThunks';
import { CategoryI } from '../../types';

interface CategoriesState {
  category: CategoryI[];
  selectCategory: string | null;
  fetchLoading: boolean;
}

const initialState: CategoriesState = {
  category: [],
  selectCategory: null,
  fetchLoading: false,
};

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    selectCategoryItem: (state, action: PayloadAction<string>) => {
      state.selectCategory = action.payload;
    },
  },
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

export const { selectCategoryItem } = categorySlice.actions;
export const selectMenuCategory = (state: RootState) =>
  state.categories.selectCategory;

export const categoryReducer = categorySlice.reducer;
export const selectCategory = (state: RootState) => state.categories.category;
export const selectFetchCategoryLoading = (state: RootState) =>
  state.categories.fetchLoading;
