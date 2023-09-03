import axios from 'axios';
import baseURL from '../../../utils/baseURL';
import { resetErrAction, resetSuccessAction } from '../globalActions/globalActions';

const { createAsyncThunk, createSlice } = require('@reduxjs/toolkit');

//initail state
const initialState = {
  types: [],
  type: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDelete: false,
};

//create type action
export const createTypeAction = createAsyncThunk(
  'category/type',
  async (name, { rejectWithValue, getState, dispatch }) => {
    try {
      //make request
      //token-auth
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `${baseURL}/types`,
        {
          name,
        },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//fetched
export const fetchedTypesAction = createAsyncThunk(
  'types/fetch All',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseURL}/types`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//slice
const typeSlice = createSlice({
  name: 'types',
  initialState,
  extraReducers: (builder) => {
    //create
    builder.addCase(createTypeAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createTypeAction.fulfilled, (state, action) => {
      state.loading = false;
      state.type = action.payload;
      state.isAdded = true;
    });
    builder.addCase(createTypeAction.rejected, (state, action) => {
      state.loading = false;
      state.type = null;
      state.isAdded = false;
      state.error = action.payload;
    });
    //fetch all
    builder.addCase(fetchedTypesAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchedTypesAction.fulfilled, (state, action) => {
      state.loading = false;
      state.types = action.payload;
      state.isAdded = true;
    });
    builder.addCase(fetchedTypesAction.rejected, (state, action) => {
      state.loading = false;
      state.types = null;
      state.isAdded = false;
      state.error = action.payload;
    });
    //reset error action
    builder.addCase(resetErrAction.pending, (state, action) => {
      state.loading = false;
      state.types = null;
      state.isAdded = false;
      state.error = null;
    });
    //reset success action
    builder.addCase(resetSuccessAction.pending, (state, action) => {
      state.loading = false;
      state.types = null;
      state.isAdded = false;
      state.error = null;
    });
  },
});

//generate the reducer
const typeReducer = typeSlice.reducer;

export default typeReducer;
