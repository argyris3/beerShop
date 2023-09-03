import axios from 'axios';
import baseURL from '../../../utils/baseURL';
import { act } from 'react-dom/test-utils';
import { resetErrAction, resetSuccessAction } from '../globalActions/globalActions';
const { createAsyncThunk, createSlice } = require('@reduxjs/toolkit');

//initial state
const initialState = {
  categories: [],
  category: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDelete: false,
};

//create category action
export const createCategoryAction = createAsyncThunk(
  'category/create',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { name, file } = payload;
      const formData = new FormData();
      formData.append('name', name);
      formData.append('file', file);

      //make request
      //token-auth
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(`${baseURL}/categories`, formData, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//fetched
export const fetchedCategoriesAction = createAsyncThunk(
  'category/fetch All',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseURL}/categories`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//slice
const categorySlice = createSlice({
  name: 'categories',
  initialState,
  extraReducers: (builder) => {
    //create
    builder.addCase(createCategoryAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.category = action.payload;
      state.isAdded = true;
    });
    builder.addCase(createCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.category = null;
      state.isAdded = false;
      state.error = action.payload;
    });
    //fetch all
    builder.addCase(fetchedCategoriesAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchedCategoriesAction.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
     
    });
    builder.addCase(fetchedCategoriesAction.rejected, (state, action) => {
      state.loading = false;
      state.categories = null;
      state.isAdded = false;
      state.error = action.payload;
    });
    //reset err
    builder.addCase(resetErrAction.pending, (state, action) => {
      state.error = null;
    });
    //reset success
    builder.addCase(resetSuccessAction.pending, (state, action) => {
      state.isAdded = false;
    });
  },
});

//generate the reducer
const categoryReducer = categorySlice.reducer;

export default categoryReducer;
