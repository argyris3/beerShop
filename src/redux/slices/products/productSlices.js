import { FaceSmileIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

import baseURL from '../../../utils/baseURL';
import { resetErrAction, resetSuccessAction } from '../globalActions/globalActions';

const { createAsyncThunk, createSlice } = require('@reduxjs/toolkit');

//initail state
const initialState = {
  products: [],
  product: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDelete: false,
};

//create product action
export const createProductAction = createAsyncThunk(
  'product/create',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { name, description, category, type, price, files, totalQty } = payload;
      //make request
      //token-auth
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      };
      //formDATA
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('type', type);

      formData.append('totalQty', totalQty);
      formData.append('price', price);
      files.forEach((file) => {
        formData.append('files', file);
      });

      const { data } = await axios.post(`${baseURL}/products`, formData, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const updateProductAction = createAsyncThunk(
  'product/update',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    console.log(payload);
    try {
      const { name, description, category, type, price, id, totalQty } = payload;
      //make request
      //token-auth
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `${baseURL}/products/${id}`,
        {
          name,
          description,
          category,
          type,
          price,
          totalQty,
          id,
        },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//fetched product action
export const fetchProductsAction = createAsyncThunk(
  'product/list',
  async ({ url }, { rejectWithValue, getState, dispatch }) => {
    console.log(url);
    try {
      //make request
      //token-auth
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(`${url}`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const fetchProductAction = createAsyncThunk(
  'product/details',
  async (productId, { rejectWithValue, getState, dispatch }) => {
    try {
      //make request
      //token-auth
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(`${baseURL}/products/${productId}`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const deleteProductAction = createAsyncThunk(
  'products/delete',
  async (productId, { rejectWithValue, getState, dispatch }) => {
    try {
      //make request
      //token-auth
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.delete(`${baseURL}/products/delete/${productId}`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  extraReducers: (builder) => {
    //create
    builder.addCase(createProductAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createProductAction.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.isAdded = true;
    });

    builder.addCase(createProductAction.rejected, (state, action) => {
      state.loading = false;
      state.product = null;
      state.isAdded = false;
      state.error = action.payload;
    });
    //update
    builder.addCase(updateProductAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProductAction.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.isUpdated = true;
    });

    builder.addCase(updateProductAction.rejected, (state, action) => {
      state.loading = false;
      state.product = null;
      state.isUpdated = false;
      state.error = action.payload;
    });
    //delete
    builder.addCase(deleteProductAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteProductAction.fulfilled, (state, action) => {
      state.loading = false;

      state.isDelete = true;
    });

    builder.addCase(deleteProductAction.rejected, (state, action) => {
      state.loading = false;

      state.error = action.payload;
    });
    //fetch all
    builder.addCase(fetchProductsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProductsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.isAdded = true;
    });

    builder.addCase(fetchProductsAction.rejected, (state, action) => {
      state.loading = false;
      state.products = null;
      state.isAdded = false;
      state.error = action.payload;
    });
    // fetch single
    builder.addCase(fetchProductAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProductAction.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.isAdded = true;
    });

    builder.addCase(fetchProductAction.rejected, (state, action) => {
      state.loading = false;
      state.product = null;
      state.isAdded = false;
      state.error = action.payload;
    });

    //reset error
    builder.addCase(resetErrAction.pending, (state, action) => {
      state.error = null;
    });
    builder.addCase(resetSuccessAction.pending, (state, action) => {
      state.isAdded = false;
    });
  },
});

//generate the reducer
const productReducer = productSlice.reducer;

export default productReducer;
